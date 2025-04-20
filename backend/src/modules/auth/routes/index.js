import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { login } from "../controllers/login.js";
import { signup } from "../controllers/signup.js";
import { logout } from "../controllers/logout.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetPassword.js";

export const router = Router();

const routes = [
  {
    method: "post",
    path: "/signup",
    middlewares: [],
    handler: signup,
  },
  {
    method: "post",
    path: "/login",
    middlewares: [],
    handler: login,
  },
  {
    method: "get",
    path: "/logout",
    middlewares: [isAuthenticated],
    handler: logout,
  },
  {
    method: "post",
    path: "/forgot-password",
    middlewares: [],
    handler: forgotPassword,
  },
  {
    method: "post",
    path: "/reset-password",
    middlewares: [],
    handler: resetPassword,
  },
];

routes.forEach(({ method, path, middlewares, handler }) => {
  router[method](path, ...middlewares, asyncHandler(handler));
});
