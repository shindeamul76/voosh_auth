"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUserReadPublic = exports.schemaUserCreateBodyParams = exports.schemaUserEditBodyParams = exports.schemaUserBaseBodyParams = void 0;
const user_zod_model_1 = require("@voosh/utils/zod/user-zod-model");
const zod_1 = require("zod");
exports.schemaUserBaseBodyParams = user_zod_model_1._UserModel.pick({
    id: true,
    email: true,
    username: true,
    password: true,
    provider: true,
    profile: true,
    token: true,
}).partial();
const schemaUserEditParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6).optional(),
});
const schemaUserCreateParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.schemaUserEditBodyParams = exports.schemaUserBaseBodyParams
    .merge(schemaUserEditParams)
    .omit({})
    .partial()
    .strict();
exports.schemaUserCreateBodyParams = exports.schemaUserBaseBodyParams
    .merge(schemaUserCreateParams)
    .omit({})
    .strict();
exports.schemaUserReadPublic = user_zod_model_1._UserModel.pick({
    id: true,
    email: true,
    username: true,
    profile: true,
}).partial();
