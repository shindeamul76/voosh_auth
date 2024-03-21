"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._AdminModel = void 0;
const zod_1 = require("zod");
exports._AdminModel = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
