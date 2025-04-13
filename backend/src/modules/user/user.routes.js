import { Router } from "express";
import { ROUTES } from "./constants.js";
import { getMe, getProfile, updateProfile } from "./user.controller.js";
import { isProtected } from "../auth/auth.middleware.js";
import upload from "../../multer/config.js";

export const router = Router();

router.get(ROUTES.USER.ME, isProtected, getMe);
router.patch(
  ROUTES.USER.ME,
  isProtected,
  upload.single("avatar"),
  updateProfile
);
router.get(ROUTES.USER.PROFILE, getProfile);
