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
exports.createAdmin = void 0;
const api_response_handler_1 = require("@voosh/utils/handlers/api-response-handler");
const async_handler_1 = require("@voosh/utils/handlers/async-handler");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("@voosh/lib/prisma"));
const user_types_1 = require("@voosh/utils/types/user-types");
const api_error_handler_1 = require("@voosh/utils/handlers/api-error-handler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_validation_1 = require("@voosh/lib/validations/admin-validation");
exports.createAdmin = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = admin_validation_1.schemaAdminCreateBodyParams.parse(req.body);
    const existingAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            email: body.email
        }
    });
    if (existingAdmin) {
        throw new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, user_types_1.USER_EXISTS);
    }
    const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
    const newAdmin = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, body), { password: hashedPassword })
    });
    const publicData = admin_validation_1.schemaAdminReadPublic.parse(newAdmin);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, publicData, user_types_1.USER_CREATE_SUCCESS));
}));
