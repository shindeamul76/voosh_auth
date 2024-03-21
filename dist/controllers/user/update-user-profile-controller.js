"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = void 0;
const api_response_handler_1 = require("@voosh/utils/handlers/api-response-handler");
const async_handler_1 = require("@voosh/utils/handlers/async-handler");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("@voosh/lib/prisma"));
const api_error_handler_1 = require("@voosh/utils/handlers/api-error-handler");
const user_validation_1 = require("@voosh/lib/validations/user-validation");
exports.updateUserProfile = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId
            },
            include: {
                profile: true
            }
        });
        if (!user) {
            throw new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const publicData = user_validation_1.schemaUserReadPublic.parse(user);
        return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, publicData, 'User profile retrieved successfully'));
    }
    catch (error) {
        // Handle errors
        console.error('Error getting user profile:', error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, 'Internal server error'));
    }
}));
