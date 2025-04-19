import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { getSocketId, getSocket } from "../../../services/socket.js";
import { logInfo } from "../../../utils/logger.js";
import { User } from "../models/user.model.js";

export async function sendFriendRequest(req, res) {
  logInfo(import.meta.url, "sendFrienRequest Hit");
  const senderId = req.user._id;
  const receiverId = req.params.id;

  if (senderId.toString() === receiverId) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      type: RESPONSE_TYPES.FAIL,
      message: "You cannot send a friend request to yourself.",
      payload: null,
    });
  }

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  switch (true) {
    case !receiver:
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.FAIL,
        message: "Receiver user not found.",
        payload: null,
      });

    case sender.friends.includes(receiverId):
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.FAIL,
        message: "You are already friends.",
        payload: null,
      });

    case receiver.requests.includes(senderId):
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.FAIL,
        message: "Friend request already sent.",
        payload: null,
      });

    case receiver.blocked.includes(senderId):
      return res.status(STATUS_CODES.FORBIDDEN).json({
        type: RESPONSE_TYPES.FAIL,
        message: "You are blocked by this user.",
        payload: null,
      });

    default:
      receiver.requests.push(senderId);
      sender.pending.push(receiverId);
      await sender.save();
      await receiver.save();

      
      const io = getSocket();

      const receiverSocketId = getSocketId(receiver._id);
      const senderSocketId = getSocketId(sender._id);
      io.to(receiverSocketId).emit("user:update", {
        payload: receiver,
      });
      io.to(receiverSocketId).emit("user:friend-request", {
        payload: receiver.requests,
      });
      io.to(senderSocketId).emit("user:update", {
        payload: sender,
      });



      return res.status(STATUS_CODES.OK).json({
        type: RESPONSE_TYPES.SUCCESS,
        message: "Friend request sent successfully.",
        payload: { user: sender },
      });
  }
}
