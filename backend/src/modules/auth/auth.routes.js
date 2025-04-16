import { Router } from "express";
import { login, logout, signup } from "./auth.controller.js";
import { ROUTES } from "./constants.js";
import { isProtected } from "./auth.middleware.js";

export const router = Router();

router.post(ROUTES.AUTH.SIGNUP, signup);
router.post(ROUTES.AUTH.LOGIN, login);

router.get(ROUTES.AUTH.LOGOUT, isProtected, logout);
