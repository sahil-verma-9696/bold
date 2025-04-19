import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../../../services/uploadToCloudinary.js";

// tested on POSTMAN ✅
export async function updateMe(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.UpdateMe_HIT);

  try {
    const { name, bio } = req.body;
    const file = req.file;
    const user = req.user;

    const updateData = {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;

    if (file) {
      const result = await uploadToCloudinary(file.buffer, file.size);
      updateData.avatar = result.secure_url;
      console.log(`✅ Avatar uploaded: ${result.secure_url}`);
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");

    logSuccess(import.meta.url, `✅ User updated: ${updatedUser._id}`);

    return res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Profile updated successfully",
      payload: { user: updatedUser },
    });
  } catch (error) {
    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message)
    );

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}
