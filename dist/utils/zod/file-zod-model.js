"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._FileModel = void 0;
const zod_1 = require("zod");
exports._FileModel = zod_1.z.object({
    id: zod_1.z.number().int(),
    fileType: zod_1.z.string(),
    fileUrl: zod_1.z.string(),
    fileName: zod_1.z.string(),
    userId: zod_1.z.number().int(),
});
