"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaAdminReadPublic = exports.schemaAdminCreateBodyParams = exports.schemaAdminEditBodyParams = exports.schemaAdminBaseBodyParams = void 0;
const admin_zod_model_1 = require("@voosh/utils/zod/admin-zod-model");
const zod_1 = require("zod");
exports.schemaAdminBaseBodyParams = admin_zod_model_1._AdminModel.pick({
    id: true,
    email: true,
    username: true,
    password: true,
}).partial();
const schemaAdminEditParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6).optional(),
});
const schemaAdminCreateParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.schemaAdminEditBodyParams = exports.schemaAdminBaseBodyParams
    .merge(schemaAdminEditParams)
    .omit({})
    .partial()
    .strict();
exports.schemaAdminCreateBodyParams = exports.schemaAdminBaseBodyParams
    .merge(schemaAdminCreateParams)
    .omit({})
    .strict();
exports.schemaAdminReadPublic = admin_zod_model_1._AdminModel.pick({
    id: true,
    email: true,
    username: true,
}).partial();
