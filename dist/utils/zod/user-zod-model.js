"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._UserModel = exports.TokenModel = exports.ProfileModel = void 0;
const zod_1 = require("zod");
exports.ProfileModel = zod_1.z.object({
    userId: zod_1.z.string(),
    name: zod_1.z.string().nullable(),
    bio: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
    photo: zod_1.z.string().nullable(),
    isPublic: zod_1.z.boolean(),
});
exports.TokenModel = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    token: zod_1.z.string(),
    expiry: zod_1.z.date(),
});
exports._UserModel = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string().nullable(),
    password: zod_1.z.string().nullable(),
    provider: zod_1.z.string().nullable(),
    profile: exports.ProfileModel.optional(),
    token: zod_1.z.array(exports.TokenModel).optional(),
});
