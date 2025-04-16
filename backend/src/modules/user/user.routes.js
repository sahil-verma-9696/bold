import { Router } from "express";
import { ROUTES } from "./constants.js";
import { isProtected } from "../auth/auth.middleware.js";
import upload from "../../multer/config.js";
import { getMe } from "./controllers/getMe.js";
import { deleteMe } from "./controllers/deleteMe.js";
import { updateMe } from "./controllers/updateMe.js";
import { getProfile } from "./controllers/getProfile.js";
import { getSettings } from "./controllers/getSetting.js";
import { updateSettings } from "./controllers/updateSetting.js";
import { getRelationshipsByStatus } from "./controllers/getRelationshipByStatus.js";
export const router = Router();

router.get(ROUTES.USER.ME, isProtected, getMe);
router.patch(ROUTES.USER.ME, isProtected, upload.single("avatar"), updateMe);
router.delete(ROUTES.USER.ME, isProtected, deleteMe);

router.get(ROUTES.USER.PROFILE, getProfile);

router.get(ROUTES.USER.SETTING, isProtected, getSettings);
router.post(ROUTES.USER.SETTING, isProtected, updateSettings);

router.get(ROUTES.USER.RELATIONSHIP, isProtected, getRelationshipsByStatus);

// router.get(ROUTES.USER.BLOCKED,isProtected);
// router.get(ROUTES.USER.KNOWN,isProtected);
