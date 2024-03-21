"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_image_controller_1 = require("@voosh/controllers/user/upload-image-controller");
const multer_middleware_1 = require("@voosh/middlewares/multer/multer-middleware");
const get_user_profile_controller_1 = require("@voosh/controllers/user/get-user-profile-controller");
const get_all_public_profiles_controller_1 = require("@voosh/controllers/user/get-all-public-profiles-controller");
const get_all_profiles_controller_1 = require("@voosh/controllers/user/get-all-profiles-controller");
const router = express_1.default.Router();
router.get('/get/profile', get_user_profile_controller_1.getUserProfile);
router.patch('/update/profile', get_user_profile_controller_1.getUserProfile);
router.get('/get/profiles/public', get_all_public_profiles_controller_1.getAllUsersPublicProfile);
router.get('/get/profiles/all', get_all_profiles_controller_1.getAllUsersProfile);
router.post('/upload', multer_middleware_1.upload.single('file'), upload_image_controller_1.uploadImage);
exports.default = router;
