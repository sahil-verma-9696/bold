import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import Message from "../message.models.js";

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

  logSuccess(import.meta.url, "Message Update successfully");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Message updated",
    payload: { message: updated },
  });
};
