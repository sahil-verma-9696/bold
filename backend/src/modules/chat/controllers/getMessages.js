import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import Message from "../models/message.js";
import { sendResponse } from "../../../utils/response.js";

export const getMessages = async (req, res) => {
  logInfo(import.meta.url, "Get Messages Hit");

  const senderId = req.user._id;
  const { receiverId } = req.query;

  if (!senderId || !receiverId) {
    throw new Error("Sender ID and Receiver ID are required");
  }

  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 });

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Messages fetched",
    { messages }
  );
};
