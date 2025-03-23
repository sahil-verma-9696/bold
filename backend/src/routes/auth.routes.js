import { Router } from "express";
import {
  login,
  logout,
  signup,
  refreshToken,
} from "../controllers/auth.controller.js";
import { ROUTES } from "./constants.js";

export const router = Router();

router.post(ROUTES.AUTH.SIGNUP, signup);
router.post(ROUTES.AUTH.LOGIN, login);

router.get(ROUTES.AUTH.LOGOUT, logout);
router.get(ROUTES.AUTH.REFRESH, refreshToken);
