import { Router } from "express";
import { ROUTES } from "../constants.js";
import { isAuthenticated } from "../../auth/middleware/isAuthenticated.js";
import upload from "../../../config/multer.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

import { getMe } from "../controllers/getMe.js";
import { deleteMe } from "../controllers/deleteMe.js";
import { updateMe } from "../controllers/updateMe.js";
import { getProfile } from "../controllers/getProfile.js";
import { getSettings } from "../user_setting/getSetting.js";
import { updateSettings } from "../user_setting/updateSetting.js";
import { getAllUsers } from "../controllers/getAllUsers.js";
import { sendFriendRequest } from "../user_relation/sendFriendRequest.js";
import { acceptFriendRequest } from "../user_relation/acceptFriendRequest.js";
import { rejectFriendRequest } from "../user_relation/rejectFriendRequest.js";
import { removeFriend } from "../user_relation/removeFriend.js";
import { searchController } from "../controllers/search.js";
import { getFriends } from "../controllers/getFriends.js";

export const router = Router();

const routes = [
  {
    method: "get",
    path: "/",
    middleware: [isAuthenticated],
    handler: getAllUsers,
  },
  {
    method: "get",
    path: "/friends",
    middleware: [isAuthenticated],
    handler: getFriends,
  },
  {
    method: "get",
    path: "/me",
    middleware: [isAuthenticated],
    handler: getMe,
  },
  {
    method: "patch",
    path: "/me",
    middleware: [isAuthenticated, upload.single("avatar")],
    handler: updateMe,
  },
  {
    method: "delete",
    path: "/me",
    middleware: [isAuthenticated],
    handler: deleteMe,
  },

  {
    method: "get",
    path: "/profile/:id",
    middleware: [],
    handler: getProfile,
  },

  {
    method: "get",
    path: "/setting",
    middleware: [isAuthenticated],
    handler: getSettings,
  },
  {
    method: "post",
    path: "/setting",
    middleware: [isAuthenticated],
    handler: updateSettings,
  },

  {
    method: "get",
    path: "/friend-request/:id",
    middleware: [isAuthenticated],
    handler: sendFriendRequest,
  },
  {
    method: "get",
    path: "/accept-request/:id",
    middleware: [isAuthenticated],
    handler: acceptFriendRequest,
  },
  {
    method: "get",
    path: "/reject-request/:id",
    middleware: [isAuthenticated],
    handler: rejectFriendRequest,
  },
  {
    method: "get",
    path: "/remove-friend/:id",
    middleware: [isAuthenticated],
    handler: removeFriend,
  },
  {
    method: "get",
    path: "/search",
    middleware: [isAuthenticated],
    handler: searchController,
  },
];

// Register routes
routes.forEach(({ method, path, middleware, handler }) => {
  router[method](path, ...middleware, asyncHandler(handler));
});
