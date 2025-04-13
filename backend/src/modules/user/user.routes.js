import { Router } from "express";
import { ROUTES } from "./constants.js";
import { getMe } from "./user.controller.js";
import { isProtected } from "../auth/auth.middleware.js";

export const router = Router();

router.get(ROUTES.USER.ME, isProtected, getMe);
