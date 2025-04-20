import { Router } from "express";

import { isAuthenticated } from "../../auth/middleware/isAuthenticated.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { createMessage } from "../controllers/createMessage.js";
import { getMessages } from "../controllers/getMessages.js";
import { getMessage } from "../controllers/getMessage.js";
import { updateMessage } from "../controllers/updateMessage.js";
import { deleteMessage } from "../controllers/deleteMessage.js";
import { markMessagesAsRead } from "../controllers/markMessagesAsRead.js";

export const router = Router();

// Define route config in array (scalable)
const routes = [
  { method: "post", path: "/", handler: createMessage },
  { method: "get", path: "/", handler: getMessages },
  { method: "get", path: "/:id", handler: getMessage },
  { method: "put", path: "/:id", handler: updateMessage },
  { method: "delete", path: "/:id", handler: deleteMessage },
  { method: "patch", path: "/mark-read", handler: markMessagesAsRead },
];

// Apply middleware to all routes and register
routes.forEach(({ method, path, handler }) => {
  router[method](path, isAuthenticated, asyncHandler(handler));
});
