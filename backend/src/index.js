const express = require('express'); // Main express application
const morgan = require('morgan'); // Log incoming requests
const helmet = require('helmet'); // Protect against common web attacks
const cors = require('cors'); // Allow cross-origin requests from frontend
const mongoose = require('mongoose'); // ORM to interface with MongoDB
const { initialize } = require('express-openapi');
const fs = require('fs');
const path = require('path');

// Import and process .env variables (as process.env.VAR_NAME)
require('dotenv').config();

// Import external middlewares
const middlewares = require('./middlewares');

// API routers
const courseRoute = require('./routes/course.route');
const staticRoute = require('./routes/static.route');
const userRoute = require('./routes/user.route');

// Define express application
const app = express();

// Connect to database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState === 4 ? 'Database connection failed.' : 'Database connection was successful.'); // eslint-disable-line no-console

// Load request logger, server hardener, and CORS origin setter
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

// Defines exclusive JSON communication when Content-Type is application/json
app.use(express.json());

// DEBUG: Main route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!!',
  });
});

// Define router to route mappings
app.use('/api/course', courseRoute);
app.use('/api/static', staticRoute);
app.use('/api/user', userRoute);

// Load OpenAPI route documentation
// const apiSchema = require('./docs/openapi');
// initialize({
//   app,
//   apiDoc: fs.readFileSync(path.resolve(__dirname, 'docs/openapi.yaml'), 'utf8'),
//   paths: path.resolve(__dirname, 'api'),
// });

// Add error-handling middleware support
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// DEBUG: Log all requests with morgan and show listening port
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`); // eslint-disable-line no-console
});
