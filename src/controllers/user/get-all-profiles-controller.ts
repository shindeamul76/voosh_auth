

import { ApiResponse } from "@voosh/utils/handlers/api-response-handler";
import { asyncHandler } from "@voosh/utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@voosh/lib/prisma"
import { schemaUserReadPublic } from "@voosh/lib/validations/user-validation";
import { PROFILE_NOT_FOUND, PROFILE_GET_SUCCESS } from "@voosh/utils/types/user-types";

export const getAllUsersProfile = asyncHandler(async (req: Request, res: Response) => {

    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });

    if (!users || users.length === 0) {
        return res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                [],
                PROFILE_NOT_FOUND
            )
        );
    }

    const publicData = users.map(user => schemaUserReadPublic.parse(user));

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            PROFILE_GET_SUCCESS
        )
    );


});