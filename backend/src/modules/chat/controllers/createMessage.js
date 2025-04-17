import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import Message from "../message.models.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";

// Create Message
export const createMessage = async (req, res) => {
  logInfo(import.meta.url, "Create Message Hit");

  const senderId = req.user._id;
  const { receiverId, text, image } = req.body;

  if (!senderId || !receiverId || (!text && !image)) {
    throw new Error("Sender, Receiver, and either text or image is required");
  }

  const message = await Message.create({ senderId, receiverId, text, image });

  logSuccess(import.meta.url, "Message Created");

  res.status(STATUS_CODES.CREATED).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Message created",
    payload: { message },
  });
};
