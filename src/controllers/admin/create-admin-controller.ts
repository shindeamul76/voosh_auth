
import { ApiResponse } from "@voosh/utils/handlers/api-response-handler";
import { asyncHandler } from "@voosh/utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@voosh/lib/prisma"
import { USER_CREATE_SUCCESS, USER_EXISTS } from "@voosh/utils/types/user-types";
import { ApiError } from "@voosh/utils/handlers/api-error-handler";
import bcrypt from "bcrypt"
import { schemaAdminCreateBodyParams, schemaAdminReadPublic } from "@voosh/lib/validations/admin-validation";


export const createAdmin = asyncHandler(async (req: Request, res: Response) => {

    const body: any = schemaAdminCreateBodyParams.parse(req.body)


    const existingAdmin = await prisma.admin.findFirst({
        where: {
            email: body.email
        }
    })

    if (existingAdmin) {
        throw new ApiError(StatusCodes.CONFLICT, USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newAdmin = await prisma.user.create({
        data: {
            ...body,
            password: hashedPassword
        }
    })

    const publicData = schemaAdminReadPublic.parse(newAdmin)

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            USER_CREATE_SUCCESS
        )
    );
});