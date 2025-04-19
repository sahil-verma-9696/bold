import { Router } from "express";

import { isProtected } from "../auth/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getUserNotifications } from "./controllers/getUserNotifications.js";
import { markNotificationAsRead } from "./controllers/markNotificationAsRead.js";
import { markAllNotificationsAsRead } from "./controllers/markAllNotificationsAsRead.js";
import { deleteNotification } from "./controllers/deleteNotification.js";

export const router = Router();

const routes = [
  { method: "get", path: "/:userId", handler: getUserNotifications },
  { method: "patch", path: "/:id/read", handler: markNotificationAsRead },
  {
    method: "patch",
    path: "/read-all/:userId",
    handler: markAllNotificationsAsRead,
  },
  { method: "delete", path: "/:id", handler: deleteNotification },
];

routes.forEach(({ method, path, handler }) => {
  router[method](path, isProtected, asyncHandler(handler));
});
