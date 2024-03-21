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
exports.CreateUser = void 0;
const prisma_1 = __importDefault(require("@voosh/lib/prisma"));
const CreateUser = (profile, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield prisma_1.default.user.findUnique({
        where: {
            email: profile.emails[0].value
        }
    });
    if (!user) {
        user = yield prisma_1.default.user.create({
            data: {
                username: profile.displayName,
                email: profile.emails[0].value,
                provider: 'google',
            }
        });
    }
    const userProfile = yield prisma_1.default.profile.upsert({
        where: {
            userId: user.id
        },
        update: {},
        create: {
            userId: user.id,
            name: profile.displayName,
            isPublic: true
        }
    });
    const token = yield prisma_1.default.token.create({
        data: {
            userId: user.id,
            token: accessToken,
            expiry: new Date()
        }
    });
    return user;
});
exports.CreateUser = CreateUser;
