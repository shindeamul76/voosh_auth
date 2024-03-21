

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from './api-error-handler';
import { StatusCodes } from 'http-status-codes';
import { VALIDATION_ERROR } from '@voosh/utils/types/common-types';

const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((error: any) => {
      if (error.issues) {
        const zodErrors = error.issues;

                const errorResponse = {
                  success: false,
                  message: VALIDATION_ERROR,
                  errors: zodErrors.map((zodError: any) => ({
                    field: zodError.path.join('.'),
                    message: zodError.message,
                  })),
                };

        
        // ===================Throwing the relevant response if validation fails
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(new ApiError(StatusCodes.BAD_REQUEST, errorResponse, VALIDATION_ERROR));
      } else if (error instanceof ApiError) {
        // ===================Throwing the relevant response if there comes an API Error
        res.status(error.statusCode).json(error.toJSON());
      } else {
        // ===================Throwing the relevant response if there comes any unknown error or any other unhandled error
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error));
      }
    });
  };
};

export { asyncHandler };