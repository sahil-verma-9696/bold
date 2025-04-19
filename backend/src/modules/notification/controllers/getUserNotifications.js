import Notification from "../notification.model.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";

export const getUserNotifications = async (req, res) => {
  logInfo(import.meta.url, "Get User Notifications Hit");

  const { userId } = req.params;

  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .populate("sender", "name avatar");

  logSuccess(import.meta.url, "Notifications fetched");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Notifications fetched successfully",
    payload: { notifications },
  });
};
