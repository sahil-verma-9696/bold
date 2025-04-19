import { Router } from "express";
import {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";
import { isProtected } from "./auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

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
    middlewares: [isProtected],
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
