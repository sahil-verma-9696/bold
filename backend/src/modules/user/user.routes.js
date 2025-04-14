import { Router } from "express";
import { ROUTES } from "./constants.js";
import { deleteMe, getMe, getProfile, updateMe } from "./user.controller.js";
import { isProtected } from "../auth/auth.middleware.js";
import upload from "../../multer/config.js";

export const router = Router();

router.get(ROUTES.USER.ME, isProtected, getMe);
router.delete(ROUTES.USER.ME, isProtected, deleteMe);
router.patch(ROUTES.USER.ME, isProtected, upload.single("avatar"), updateMe);
router.get(ROUTES.USER.PROFILE, getProfile);
