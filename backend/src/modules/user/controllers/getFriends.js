import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { sendResponse } from "../../../utils/response.js";
import { User } from "../models/user.js";
export async function getFriends(req, res) {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate("friends", "-password") // Exclude sensitive fields
    .select("friends");

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "friends fetched successfully.",
    {
      friends: user.friends,
    }
  );
}
