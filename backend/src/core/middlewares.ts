import { NextFunction, Request, Response } from 'express';
import logger from '@shared/Logger';

// Status Code constants
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logger.err(error, true);
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'None' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
