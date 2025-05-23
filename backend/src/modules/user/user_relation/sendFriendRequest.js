import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { getSocket, getSocketId } from "../../../app.js";
import { logInfo } from "../../../utils/logger.js";
import { User } from "../models/user.js";
import { sendResponse } from "../../../utils/response.js";

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
      await sender.populate(
        "pending",
        "-password -role -lastSeen -pending -requests -blocked -friends -__v"
      );
      await receiver.populate(
        "requests",
        "-password -role -lastSeen -pending -requests -blocked -friends -__v"
      );

      const io = getSocket();

      const receiverSocketId = getSocketId(receiver._id);
      const senderSocketId = getSocketId(sender._id);

      io.to(senderSocketId).emit("FR:sended", {
        event: "FR:sended",
        message: "friend requeste sended to " + receiver.name,
        payload: {
          pendings: sender.pending,
        },
      });
      io.to(receiverSocketId).emit("FR:received", {
        event: "FR:received",
        message: receiver.name + " friend requeste received",
        payload: {
          requests: receiver.requests,
        },
      });

      // io.to(receiverSocketId).emit("user:update", {
      //   payload: receiver,
      // });

      // io.to(senderSocketId).emit("user:update", {
      //   type: "socket",
      //   message: "friend request",
      //   payload: sender,
      // });

      return sendResponse(
        res,
        STATUS_CODES.OK,
        RESPONSE_TYPES.SUCCESS,
        `${sender.name} send Friend request to ${receiver.name}`,
        { user: sender }
      );
  }
}
