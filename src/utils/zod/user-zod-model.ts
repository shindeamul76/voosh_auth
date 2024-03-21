import { z } from "zod";

export const ProfileModel = z.object({
    userId: z.string(),
    name: z.string().nullable(),
    bio: z.string().nullable(),
    phone: z.string().nullable(),
    photo: z.string().nullable(),
    isPublic: z.boolean(),
});


export const TokenModel = z.object({
    id: z.string(),
    userId: z.string(),
    token: z.string(),
    expiry: z.date(),
});

export const _UserModel = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string().nullable(),
    password: z.string().nullable(),
    provider: z.string().nullable(),
    profile: ProfileModel.optional(),
    token: z.array(TokenModel).optional(),
});


