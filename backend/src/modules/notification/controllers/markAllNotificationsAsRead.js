import Notification from "../notification.model.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";

export const markAllNotificationsAsRead = async (req, res) => {
  logInfo(import.meta.url, "Mark All Notifications As Read Hit");

  const { userId } = req.params;

  await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });

  logSuccess(import.meta.url, "All notifications marked as read");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "All notifications marked as read",
  });
};
