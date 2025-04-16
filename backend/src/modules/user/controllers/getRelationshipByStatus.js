import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { logInfo, logSuccess, logError } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { KnowUser } from "../models/knowUser.js";

export async function getRelationshipsByStatus(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GetRelationshipsByStatus_HIT);
  try {
    const { _id } = req.user;
    const status = req.params.type || req.query.status;

    if (!["friend", "blocked", "pending"].includes(status)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Invalid relationship status.",
      });
    }

    logInfo(import.meta.url, `Fetching ${status} list for user ${_id}`);

    const users = await KnowUser.find({ userId: _id, status })
      .populate("knownUserId", "-password -__v") // populate user details
      .lean();

    const knownUsers = users.map((rel) => rel.knownUserId);

    logSuccess(import.meta.url, `Fetched ${status} users for ${_id}`);

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: `Fetched ${status} users successfully`,
      payload: knownUsers,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
    });
  }
}
