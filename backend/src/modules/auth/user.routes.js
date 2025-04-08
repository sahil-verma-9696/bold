import { Router } from "express";
import { login, logout, signup, getMe } from "./user.controller.js";
import { ROUTES } from "./constants.js";
import { isProtected } from "./protected.middleware.js";

export const router = Router();

router.post(ROUTES.AUTH.SIGNUP, signup);
router.post(ROUTES.AUTH.LOGIN, login);

router.get(ROUTES.AUTH.LOGOUT, isProtected, logout);
router.get(ROUTES.AUTH.ME, isProtected, getMe);
