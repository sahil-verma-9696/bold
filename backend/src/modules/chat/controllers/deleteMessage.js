import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import Message from "../message.models.js";

export const deleteMessage = async (req, res) => {
  logInfo(import.meta.url, "delete Message Hit");

  const { id } = req.params;

  const deleted = await Message.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Message not found or could not be deleted");
  }

  logSuccess(import.meta.url, "Message Deleted: " + deleted._id);

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Message deleted",
    payload: { message: deleted },
  });
};
