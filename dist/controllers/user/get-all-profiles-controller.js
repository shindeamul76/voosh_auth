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
exports.getAllUsersProfile = void 0;
const api_response_handler_1 = require("@voosh/utils/handlers/api-response-handler");
const async_handler_1 = require("@voosh/utils/handlers/async-handler");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("@voosh/lib/prisma"));
const user_validation_1 = require("@voosh/lib/validations/user-validation");
const user_types_1 = require("@voosh/utils/types/user-types");
exports.getAllUsersProfile = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        include: {
            profile: true
        }
    });
    if (!users || users.length === 0) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, [], user_types_1.PROFILE_NOT_FOUND));
    }
    const publicData = users.map(user => user_validation_1.schemaUserReadPublic.parse(user));
    return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, publicData, user_types_1.PROFILE_GET_SUCCESS));
}));
