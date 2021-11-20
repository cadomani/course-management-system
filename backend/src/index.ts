import './core/pre-launch'; // Run pre-launch checks
import express, { NextFunction, Request, Response, urlencoded } from 'express'; // Main express application
import * as Sentry from '@sentry/node'; // Issue tracking and ingestion platform
import * as Tracing from '@sentry/tracing'; // Frontend to backend tracing module
import { RewriteFrames } from '@sentry/integrations'
import logger from '@shared/Logger'; // Global logger
import prisma from '@shared/Database'; // Database ORM
import fs from 'fs'; // Allow filesystem access
import path from 'path'; // Map paths for static file serving
import morgan from "morgan"; // Log incoming requests
import helmet from "helmet"; // Protect against common web attacks
import cors from 'cors'; // Allow cross-origin requests from frontend
import cookieParser from 'cookie-parser' // Request cookie parsing and validation
import 'express-async-errors'; // Error handling in async context
import * as OpenApiValidator from 'express-openapi-validator';
import { errorHandler } from './core/middlewares';  // Import custom middlewares
import passport from 'passport'; // Authentication and session management
import * as passportSettings from './core/auth'; // Authentication configuration
import session from 'express-session'; // Session management using cookies

// Import and process .env variables (as process.env.VAR_NAME)
require('dotenv').config();

// Define express application and configuration
const app = express();
app.use(urlencoded({ extended: true }));

// Initialize Sentry
const EXPRESS_SENTRY_ENABLE = process.env.EXPRESS_SENTRY_ENABLE || "false";
if (EXPRESS_SENTRY_ENABLE === 'true') {
  logger.info(`Backend Sentry DSN ${process.env.EXPRESS_SENTRY_DSN} for environment ${process.env.EXPRESS_SENTRY_ENVIRONMENT}`);
  Sentry.init({
    dsn: process.env.EXPRESS_SENTRY_DSN,
    integrations: [
      // @ts-ignore
      new RewriteFrames({ root: process.env.HEROKU_ROOT_BACKEND_DIR}),
      new Sentry.Integrations.Http({ tracing: true }), // enable HTTP calls tracing
      new Tracing.Integrations.Express({ app }), // enable Express.js middleware tracing
    ],
  
    // Capture every transaction
    tracesSampleRate: 1.0,
    environment: process.env.EXPRESS_SENTRY_ENVIRONMENT
  });
  
  // Sentry middlewares loaded first
  app.use(Sentry.Handlers.requestHandler()); // Creates a separate execution context using domains
  app.use(Sentry.Handlers.tracingHandler()); // TracingHandler creates a trace for every incoming request
}


// Library Middlewares
app.use(morgan('common'));
app.use(helmet({
  hsts: process.env.NODE_ENV === 'development' ? false : true,
  hidePoweredBy: false
}));
app.disable("x-powered-by")
app.use(cors({
  origin: '*',
}));

// Serve the OpenAPI spec
app.use('/docs', express.static(path.join(__dirname, 'docs/openapi.json')));

// Set up OpenAPI Validator
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: path.join(__dirname, 'docs/openapi.json'),
//     validateResponses: false,
//     validateRequests: false,
//     validateApiSpec: false
//   }),
// );

// API routers
import courseRoute from './routes/course.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import registrationRoute from './routes/registration.route';

// Plugins
app.use(express.json()); // Defines exclusive JSON communication when Content-Type is application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Add session and authentication middleware
app.set('trust proxy', 1)
app.use(session({
  secret: (process.env.APP_SECRET as string),
  resave: false,
  saveUninitialized: false,
  name: 'cms.session',
  cookie: {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    domain: process.env.DOMAIN,
    path: '/',
    maxAge: Number.parseInt(process.env.COOKIE_MAX_AGE as string)
  }
}));
app.use(passport.initialize())

// Main route
if (process.env.NODE_ENV === 'production') {
  logger.info('Production server running...')
}
app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));

// Define router to route mappings
app.use('/api/course', courseRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/registration', registrationRoute);

// Handles non-api requests, such as those from react router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Add error-handling middleware support
if (EXPRESS_SENTRY_ENABLE === "true") {
  app.use(Sentry.Handlers.errorHandler());
}
app.use(errorHandler);

// Log all requests with morgan and show listening port
const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  logger.info(`listening on port ${process.env.PORT}`);
});
