import { logError, logInfo, logSuccess } from "../../utils/logger.js";
import { MESSAGES } from "./constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../constants/script.js";
import { User } from "../auth/user.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../../services/uploadToCloudinary.js";

export function getMe(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.Getme_HIT);
  try {
    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.USER_AUTH_SUCCESS.replace("{}", req.user?.id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.AUTH_SUCCESS,
      payload: { user: req.user },
    });
  } catch (error) {
    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message)
    );
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}

export async function getProfile(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GetProfile_HIT);
  try {
    const id = req.params.id;

    if (!id) {
      logError(import.meta.url, "params not found");
      throw new Error("Missing user ID in request params");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id");
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      logError(import.meta.url, "user not found");
      throw new Error("user not found");
    }

    logSuccess(import.meta.url, MESSAGES.LOGS.USER_FETCHED.replace("{}", id));

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.AUTH_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.RESPONSE.ERROR_OCCURED;

    switch (true) {
      case error.message.includes("Cast to ObjectId"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "Invalid ID";
        break;

      case error.message.includes("Missing"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "Missing user ID in request params";
        break;

      case error.message.includes("not found"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "User not found";
        break;

      default:
        message = error.message || message;
        break;
    }

    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED?.replace("{}", message) || message
    );

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message,
      payload: null,
    });
  }
}


// tested on POSTMAN ✅
export async function updateProfile(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.UpdateProfile_HIT);

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
    logError(import.meta.url, MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message));

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}

