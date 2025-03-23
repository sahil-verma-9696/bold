import { Router } from "express";
import { ROUTES } from "./constants.js";
import {
  updateProfileByUser,
  userProfile,
} from "../controllers/user.controller.js";
import { isProtected } from "../middleware/protected.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

export const router = Router();

router.get(ROUTES.USER.PROFILE, isProtected, userProfile); //✅
// router.get(ROUTES.USER.SEARCH)

router.post(ROUTES.USER.UPDATE, isProtected, updateProfileByUser); //✅

//TODO:

// router.get(ROUTES.USER.CONNECTIONS)

// router.post(ROUTES.USER.FOLLOW)
// router.post(ROUTES.USER.PREFERENCES)

// router.delete(ROUTES.USER.DELETE);
