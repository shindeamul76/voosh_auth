import { s3 } from "@voosh/lib/aws-sdk-lib";
import { ApiResponse } from "@voosh/utils/handlers/api-response-handler";
import { asyncHandler } from "@voosh/utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@voosh/lib/prisma"
import { FILE_UPLOADED_SUCCESSFULLY, FileObject, NO_FILE_PROVIDED, UploadParams } from "@voosh/utils/types/upload-file-types";
import { AWS_S3_BUCKET } from "@voosh/main/config";
import { INTERNAL_SERVER_ERROR } from "@voosh/utils/types/common-types";
import logger from "@voosh/lib/winston";
// import { schemaFileCreateBodyParams } from "@voosh/lib/validations/file-validation";
import { Profile } from "@prisma/client";


export const uploadImage = asyncHandler(async (req: Request, res: Response) => {

  const file = req.file;
  const userId = req.user.id


  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        StatusCodes.BAD_REQUEST,
        null,
        NO_FILE_PROVIDED
      )
    );
  }


  const fileName: string = file.originalname;
  let fileUrl:string[];



  const params: UploadParams = {
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };


  const uploadImagePromise = () => {
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          logger.error('Error uploading data: ', err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  try {
    await uploadImagePromise();

    const url: string = s3.getSignedUrl('getObject', {
      Bucket: AWS_S3_BUCKET,
      Key: fileName,
      Expires: 3600,
    });

    fileUrl = url.split('?');
 
  } catch (error) {
    logger.error('Error uploading data: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ApiResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        INTERNAL_SERVER_ERROR
      )
    );
  }


  const newProfile: Profile = await prisma.profile.update({
    where:{
        userId:userId
    },
    data: {
        photo: fileUrl[0]
    }
  });

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(
      StatusCodes.CREATED,
      newProfile,
      FILE_UPLOADED_SUCCESSFULLY
    )
  );
});