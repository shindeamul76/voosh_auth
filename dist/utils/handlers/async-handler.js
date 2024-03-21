"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const api_error_handler_1 = require("./api-error-handler");
const http_status_codes_1 = require("http-status-codes");
const common_types_1 = require("@voosh/utils/types/common-types");
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            if (error.issues) {
                const zodErrors = error.issues;
                const errorResponse = {
                    success: false,
                    message: common_types_1.VALIDATION_ERROR,
                    errors: zodErrors.map((zodError) => ({
                        field: zodError.path.join('.'),
                        message: zodError.message,
                    })),
                };
                // ===================Throwing the relevant response if validation fails
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json(new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, errorResponse, common_types_1.VALIDATION_ERROR));
            }
            else if (error instanceof api_error_handler_1.ApiError) {
                // ===================Throwing the relevant response if there comes an API Error
                res.status(error.statusCode).json(error.toJSON());
            }
            else {
                // ===================Throwing the relevant response if there comes any unknown error or any other unhandled error
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, error));
            }
        });
    };
};
exports.asyncHandler = asyncHandler;
