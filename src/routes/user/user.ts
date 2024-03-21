import express, { Request, Response, Router } from 'express';
import { uploadImage } from '@voosh/controllers/user/upload-image-controller'
import { upload } from '@voosh/middlewares/multer/multer-middleware';
import { getUserProfile } from "@voosh/controllers/user/get-user-profile-controller"
import { getAllUsersPublicProfile } from "@voosh/controllers/user/get-all-public-profiles-controller"
import { getAllUsersProfile } from "@voosh/controllers/user/get-all-profiles-controller"

const router: Router = express.Router();

router.get('/get/profile', getUserProfile);

router.patch('/update/profile', getUserProfile)

router.get('/get/profiles/public', getAllUsersPublicProfile)

router.get('/get/profiles/all', getAllUsersProfile)

router.post('/upload', upload.single('file'), uploadImage);




export default router;
