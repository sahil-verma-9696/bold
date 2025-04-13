import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.models.js";
import { DEFAULT_AVATAR } from "../modules/auth/constants.js";
import { User } from "../modules/auth/user.model.js";
import { logSuccess, logError, logInfo } from "../utils/logger.js";
import { MESSAGES, RESPONSE_TYPES, STATUS_CODES } from "./utils/constants.js";

export async function getUsersForSidebar(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GET_USERS_HIT);
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    logSuccess(import.meta.url, MESSAGES.LOGS.GET_USERS_SUCCESS);
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.GET_USERS_SUCCESS,
      payload: filteredUsers,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: MESSAGES.RESPONSE.GENERIC_ERROR,
      payload: null,
    });
  }
}

export async function getMessage(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GET_MESSAGES_HIT);
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    logSuccess(import.meta.url, MESSAGES.LOGS.GET_MESSAGES_SUCCESS);
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.GET_MESSAGES_SUCCESS,
      payload: messages,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: MESSAGES.RESPONSE.GENERIC_ERROR,
      payload: null,
    });
  }
}
export async function sendMessage(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.SEND_MESSAGE_HIT);
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) throw new Error(MESSAGES.RESPONSE.MESSAGE_EMPTY);

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: DEFAULT_AVATAR,
    });
    await newMessage.save();
    logSuccess(import.meta.url, MESSAGES.LOGS.MESSAGE_SAVED);

    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId); // Get sender's socket ID
    console.log(`\nreceiverId: ${receiverId}\n socketId: ${receiverSocketId}`);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      logSuccess(
        import.meta.url,
        MESSAGES.LOGS.MESSAGE_EMITTED.replace("{}", receiverId)
      );
    }

    // ✅ Emit message to sender too
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
      console.log("\nsocket id: " + senderSocketId + "\n");
      logSuccess(
        import.meta.url,
        MESSAGES.LOGS.MESSAGE_EMITTED.replace("{}", senderId)
      );
    }

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.MESSAGE_SENT,
      payload: newMessage,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}
