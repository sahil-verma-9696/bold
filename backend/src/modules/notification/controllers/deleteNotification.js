import Notification from "../notification.model.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";

export const deleteNotification = async (req, res) => {
  logInfo(import.meta.url, "Delete Notification Hit");

  const { id } = req.params;

  const deleted = await Notification.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Notification not found");
  }

  logSuccess(import.meta.url, "Notification deleted");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Notification deleted successfully",
    payload: null
  });
};

