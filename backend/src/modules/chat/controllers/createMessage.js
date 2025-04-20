import { logInfo } from "../../../utils/logger.js";
import Message from "../models/message.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { sendResponse } from "../../../utils/response.js";

export const createMessage = async (req, res) => {
  logInfo(import.meta.url, "Create Message Hit");

  const senderId = req.user._id;
  const { receiverId, text, image } = req.body;

  if (!senderId || !receiverId || (!text && !image)) {
    throw new Error("Sender, Receiver, and either text or image is required");
  }

  const message = await Message.create({ senderId, receiverId, text, image });

  sendResponse(
    res,
    STATUS_CODES.CREATED,
    RESPONSE_TYPES.SUCCESS,
    "Message created",
    { message }
  );
};
