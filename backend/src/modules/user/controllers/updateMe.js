import { logInfo, logSuccess } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.js";
import { uploadToCloudinary } from "../../../services/uploadToCloudinary.js";
import { sendResponse } from "../../../utils/response.js";

// tested on POSTMAN ✅
export async function updateMe(req, res) {
  logInfo(import.meta.url, "updateMe() endpoint hit");

  const { name, bio } = req.body;
  const file = req.file;
  const user = req.user;

  const updateData = {};

  if (name) updateData.name = name;
  if (bio) updateData.bio = bio;

  if (file) {
    const result = await uploadToCloudinary(file.buffer, file.size);
    // console.log(result);

    updateData.avatar = result.secure_url;
    logSuccess(import.meta.url, `✅ Avatar uploaded: ${result.secure_url}`);
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
    new: true,
    runValidators: true,
    context: "query",
  }).select("-password");

  return sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Profile updated successfully",
    { user: updatedUser }
  );
}
