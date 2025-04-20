import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { getSocketId } from "../../../services/socket.js";
import { logInfo } from "../../../utils/logger.js";
import { sendResponse } from "../../../utils/response.js";
import Message from "../models/message.js";

export const markMessagesAsRead = async (req, res) => {
  logInfo(import.meta.url, "markMessagesAsRead route Hit");

  const receiverId = req.user._id;
  const { senderId } = req.body;

  // Update messages as read
  const result = await Message.updateMany(
    { senderId, receiverId, isRead: false },
    { $set: { isRead: true } }
  );

  // Check if any messages were updated
  if (result.nModified === 0) {
    return sendResponse(
      res,
      STATUS_CODES.NOT_FOUND,
      RESPONSE_TYPES.ERROR,
      "No messages found to mark as read",
      null
    );
  }

  // Emit real-time seen status
  const io = req.io;
  if (!io) {
    throw new Error("Socket not found");
  }

  const receiverSocketId = getSocketId(senderId);
  if (!receiverSocketId) {
    return console.log("Receiver is offline");
  }

  io.to(receiverSocketId).emit("message:read", { by: receiverId });

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Messages marked as read",
    null
  );
};
