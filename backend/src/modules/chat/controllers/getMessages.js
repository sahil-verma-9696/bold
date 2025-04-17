import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import Message from "../message.models.js";

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

  logSuccess(import.meta.url, "Messages Retrieved");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Messages fetched",
    payload: { messages },
  });
};
