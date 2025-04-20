import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import Message from "../models/message.js";
import { sendResponse } from "../../../utils/response.js";

export const deleteMessage = async (req, res) => {
  logInfo(import.meta.url, "Delete Message Hit");

  const { id } = req.params;

  const deleted = await Message.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Message not found or could not be deleted");
  }

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Message deleted",
    { message: deleted }
  );
};
