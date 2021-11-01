import './core/pre-launch'; // Run pre-launch checks
import logger from '@shared/Logger'; // Global logger
import prisma from '@shared/Database'; // Database ORM
import express, { NextFunction, Request, Response, urlencoded } from 'express'; // Main express application
import fs from 'fs'; // Allow filesystem access
import path from 'path'; // Map paths for static file serving
import morgan from "morgan"; // Log incoming requests
import helmet from "helmet"; // Protect against common web attacks
import cors from 'cors'; // Allow cross-origin requests from frontend
import cookieParser from 'cookie-parser' // Request cookie parsing and validation
import 'express-async-errors'; // Error handling in async context
import { initialize } from 'express-openapi'; // TODO: will be replaced by express-openapi-validator 
import { errorHandler } from './core/middlewares';  // Import custom middlewares
import passport from 'passport';
import * as passportSettings from './core/auth';

// Import and process .env variables (as process.env.VAR_NAME)
require('dotenv').config();

// Define express application and configuration
const app = express();
app.use(urlencoded({ extended: true }));

// API routers
import courseRoute from './routes/course.route';
import staticRoute from './routes/static.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import registrationRoute from './routes/registration.route';

// Plugins
app.use(express.json()); // Defines exclusive JSON communication when Content-Type is application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Library Middlewares
app.use(morgan('common'));
// app.use(helmet({ hsts: false }));
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
// }));

// Add error-handling middleware support
app.use(errorHandler);
app.use(passport.initialize())


// DEBUG: Main route
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));
} else {
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!!',
    });
  });
}

// Define router to route mappings
app.use('/api/course', courseRoute);
app.use('/api/static', staticRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/registration', registrationRoute);

// DEBUG: Log all requests with morgan and show listening port
const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
