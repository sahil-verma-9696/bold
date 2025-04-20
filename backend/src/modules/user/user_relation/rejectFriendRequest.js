import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { getSocket, getSocketId } from "../../../app.js";
import { logInfo } from "../../../utils/logger.js";
import { User } from "../models/user.js";
import { sendResponse } from "../../../utils/response.js";

export async function rejectFriendRequest(req, res) {
  logInfo(import.meta.url, "rejectFriendRequest Hit");

  const receiverId = req.user._id; // the one rejecting the request
  const senderId = req.params.id; // the one who sent the request

  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  switch (true) {
    case !sender:
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.FAIL,
        message: "Sender user not found.",
        payload: null,
      });

    case !receiver.requests.includes(senderId):
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.FAIL,
        message: "No friend request from this user to reject.",
        payload: null,
      });

    default:
      // Remove from receiver.requests and sender.pending
      receiver.requests = receiver.requests.filter(
        (id) => id.toString() !== senderId
      );
      sender.pending = sender.pending.filter(
        (id) => id.toString() !== receiverId.toString()
      );

      await receiver.save();
      await sender.save();

      const io = getSocket();
      const receiverSocketId = getSocketId(receiver._id);
      const senderSocketId = getSocketId(sender._id);
      io.to(receiverSocketId).emit("user:update", {
        payload: receiver,
      });
      io.to(senderSocketId).emit("user:update", {
        payload: sender,
      });

      return sendResponse(
        res,
        STATUS_CODES.OK,
        RESPONSE_TYPES.SUCCESS,
        `${receiver.name} rejected Friend request of ${sender.name}.`,
        { user: receiver }
      );

  }
}
