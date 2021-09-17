// Module-level imports
import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import { URL } from 'url';
import cookieParser from 'cookie-parser';

// Define file paths as URL contexts
const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

// An HTTP request logger middleware for node.
import logger from 'morgan';

// Define routers for each of the views
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// Instatiate main express application
var app = express();

// Set up mongoose connection
import mongoose from 'mongoose';
var mongodb = process.env.MONGO_URL;
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up the view engine using pug and map it to the views folder
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// Defines container logging for development purposes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set express up for serving static files
app.use(express.static(join(__dirname, 'public')));

// Map out http routes for each of the routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Middleware to catch 404s and forward to error handler function
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Make this available to the entire module
export default app;
