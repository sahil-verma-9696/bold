import { getReceiverSocketId } from "../../../services/socket.js";
import { logInfo } from "../../../utils/logger.js";
import Message from "../message.models.js";

export const markMessagesAsRead = async (req, res) => {
  logInfo(import.meta.url, "markMessagesAsRead route HIt");
  const receiverId = req.user._id;
  const { senderId } = req.body;

  const result = await Message.updateMany(
    { senderId, receiverId, isRead: false },
    { $set: { isRead: true } }
  );

  // ✅ Emit real-time seen status
  const io = req.io;
  if (io) {
    const receiverSocketId = getReceiverSocketId(senderId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message:read", {
        by: receiverId,
      });
    }
  } else {
    throw new Error("Socket not found");
  }

  res.status(200).json({
    type: "success",
    message: "Messages marked as read",
  });
};
