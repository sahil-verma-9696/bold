import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import Message from "../models/message.js";
import { sendResponse } from "../../../utils/response.js";

export const updateMessage = async (req, res) => {
  logInfo(import.meta.url, "update Messages Hit");

  const { id } = req.params;
  const { text, image } = req.body;

  const updated = await Message.findByIdAndUpdate(
    id,
    { text, image },
    { new: true }
  );

  if (!updated) {
    throw new Error("Message not found or could not be updated");
  }

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "Message updated",
    { message: updated }
  );
};
