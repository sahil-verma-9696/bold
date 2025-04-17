import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import Message from "../message.models.js";

export const getMessage = async (req, res) => {
  logInfo(import.meta.url, "Get Message Hit");

  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    throw new Error("Message not found");
  }

  logSuccess(import.meta.url, "Message Retrieved");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Message fetched",
    payload: { message },
  });
};
