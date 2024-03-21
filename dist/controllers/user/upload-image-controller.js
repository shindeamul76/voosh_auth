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
exports.uploadImage = void 0;
const aws_sdk_lib_1 = require("@voosh/lib/aws-sdk-lib");
const api_response_handler_1 = require("@voosh/utils/handlers/api-response-handler");
const async_handler_1 = require("@voosh/utils/handlers/async-handler");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("@voosh/lib/prisma"));
const upload_file_types_1 = require("@voosh/utils/types/upload-file-types");
const config_1 = require("@voosh/main/config");
const common_types_1 = require("@voosh/utils/types/common-types");
const winston_1 = __importDefault(require("@voosh/lib/winston"));
exports.uploadImage = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const userId = req.user.id;
    if (!file) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, null, upload_file_types_1.NO_FILE_PROVIDED));
    }
    const fileName = file.originalname;
    let fileUrl;
    const params = {
        Bucket: config_1.AWS_S3_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const uploadImagePromise = () => {
        return new Promise((resolve, reject) => {
            aws_sdk_lib_1.s3.upload(params, (err, data) => {
                if (err) {
                    winston_1.default.error('Error uploading data: ', err);
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    try {
        yield uploadImagePromise();
        const url = aws_sdk_lib_1.s3.getSignedUrl('getObject', {
            Bucket: config_1.AWS_S3_BUCKET,
            Key: fileName,
            Expires: 3600,
        });
        fileUrl = url.split('?');
    }
    catch (error) {
        winston_1.default.error('Error uploading data: ', error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, common_types_1.INTERNAL_SERVER_ERROR));
    }
    const newProfile = yield prisma_1.default.profile.update({
        where: {
            userId: userId
        },
        data: {
            photo: fileUrl[0]
        }
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newProfile, upload_file_types_1.FILE_UPLOADED_SUCCESSFULLY));
}));
