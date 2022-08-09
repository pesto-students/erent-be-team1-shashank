/* eslint-disable no-unused-vars */
import status from 'http-status';

import ErrorResponse from 'utils/errorResponse';

const errorHandler = (err, _, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //   Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resources not found with the id of ${err.value}`;
    error = new ErrorResponse(message, status.NOT_FOUND);
  }

  //   Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, status.BAD_REQUEST);
  }

  // Mongoose duplicate error
  if (error.code === 11000) {
    let message = Object.keys(err.keyValue);
    message = `Duplicate entry: ${message.join(', ')}`;
    error = new ErrorResponse(message, status.BAD_REQUEST);
  }

  res.status(error.statusCode || status.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

export default errorHandler;
