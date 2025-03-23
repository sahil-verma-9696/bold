import { Router } from "express";
import { ROUTES } from "./constants.js";
import { isProtected } from "../middleware/protected.middleware.js";
import {
  getMessage,
  getUsersForSidebar,
} from "../controllers/message.controller.js";

export const router = Router();

router.get(ROUTES.MESSAGE.GET_SIDEBAR_USERS, isProtected, getUsersForSidebar);
router.get(ROUTES.MESSAGE.GET_MESSAGE, isProtected, getMessage);
