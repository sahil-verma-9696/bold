import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import Message from "../models/message.js";
import { sendResponse } from "../../../utils/response.js";

export const getMessage = async (req, res) => {
  logInfo(import.meta.url, "Get Message Hit");

  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    throw new Error("Message not found");
  }

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Message fetched",
    { message }
  );
};
