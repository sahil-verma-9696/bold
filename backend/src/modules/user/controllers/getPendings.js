import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { sendResponse } from "../../../utils/response.js";
import { User } from "../models/user.js";
export async function getPendings(req, res) {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate("pending", "-password") // Exclude sensitive fields
    .select("pending");

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Pending fetched successfully.",
    {
      pending: user.pending,
    }
  );
}
