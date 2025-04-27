import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { sendResponse } from "../../../utils/response.js";
import { User } from "../models/user.js";
export async function getFriendRequests(req, res) {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate("requests", "-password") // Exclude sensitive fields
    .select("requests");

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Friend Requests fetched successfully.",
    {
      requests: user.requests,
    }
  );
}
