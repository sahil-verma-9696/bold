import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { getSocket, getSocketId } from "../../../app.js";
import { logInfo } from "../../../utils/logger.js";
import { User } from "../models/user.js";
import { sendResponse } from "../../../utils/response.js";

export async function removeFriend(req, res) {
  logInfo(import.meta.url, "removeFriend Hit");

  const userId = req.user._id; // the one removing the friend
  const friendId = req.params.id; // the friend to be removed

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  switch (true) {
    case !friend:
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.FAIL,
        message: "Friend user not found.",
        payload: null,
      });

    case !user.friends.includes(friendId):
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.FAIL,
        message: "You are not friends with this user.",
        payload: null,
      });

    default:
      // Remove each other from friends list
      user.friends = user.friends.filter((id) => id.toString() !== friendId);
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== userId.toString()
      );

      await user.save();
      await friend.save();

      const io = getSocket();
      const userSocketId = getSocketId(user._id);
      const friendSocketId = getSocketId(friend._id);
      io.to(userSocketId).emit("user:update", { payload: user });
      io.to(friendSocketId).emit("user:update", { payload: friend });

      return sendResponse(
        res,
        STATUS_CODES.OK,
        RESPONSE_TYPES.SUCCESS,
        `${user.name} remove ${friend.name} as friend`,
        { user: friend }
      );
  }
}
