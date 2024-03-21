

import { ApiResponse } from "@voosh/utils/handlers/api-response-handler";
import { asyncHandler } from "@voosh/utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@voosh/lib/prisma"
import { schemaUserReadPublic } from "@voosh/lib/validations/user-validation";
import { PROFILE_NOT_FOUND, USER_PROFILE_GET_SUCCESS } from "@voosh/utils/types/user-types";


export const getUserProfile = asyncHandler( async (req: Request, res: Response) => {

        const userId = req.params.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                profile: true
            }
        });

        if (!user) {
            return res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    [],
                    PROFILE_NOT_FOUND
                )
            );
        }

        const publicData = schemaUserReadPublic.parse(user);

        return res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                publicData,
                USER_PROFILE_GET_SUCCESS
            )
        );
 
});