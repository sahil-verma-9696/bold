import Notification from "../notification.model.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";

export const markNotificationAsRead = async (req, res) => {
  logInfo(import.meta.url, "Mark Notification As Read Hit");

  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new Error("Notification not found");
  }

  logSuccess(import.meta.url, "Notification marked as read");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Notification marked as read",
    payload: { notification },
  });
};
