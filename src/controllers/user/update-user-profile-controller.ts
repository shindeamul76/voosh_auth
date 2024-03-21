

import { ApiResponse } from "@voosh/utils/handlers/api-response-handler";
import { asyncHandler } from "@voosh/utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@voosh/lib/prisma"
import { ApiError } from "@voosh/utils/handlers/api-error-handler";
import { schemaUserReadPublic } from "@voosh/lib/validations/user-validation";


export const updateUserProfile = asyncHandler( async (req: Request, res: Response) => {
    try {
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
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }

        const publicData = schemaUserReadPublic.parse(user);

        return res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                publicData,
                'User profile retrieved successfully'
            )
        );
    } catch (error) {
        // Handle errors
        console.error('Error getting user profile:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            new ApiResponse(
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                'Internal server error'
            )
        );
    }
});