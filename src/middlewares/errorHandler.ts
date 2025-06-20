import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: err,
    });
  }

  if (err.status === 404) {
    res.status(404).json({
      message: 'Resource not found',
      success: false,
      error: 'NotFoundError',
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    success: false,
    error: err.message || 'Unexpected error occurred',
  });
};

export default errorHandler;
