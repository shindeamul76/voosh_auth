"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const config_1 = require("@voosh/main/config");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: config_1.AWS_ACCESS_KEY,
    secretAccessKey: config_1.AWS_SCRETE_ACCESS_KEY
});
exports.s3 = new aws_sdk_1.default.S3();
