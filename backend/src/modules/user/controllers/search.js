import { searchUsers } from "../utils/searchUsersFilter.js";
import { sendResponse } from "../../../utils/response.js";

export const searchController = async (req, res) => {
  const {
    q,
    filter = "all",
    excludeBlocked,
    excludeEmail,
    searchBy,
  } = req.query;

  const currentUserId = req.user._id;

  const users = await searchUsers(q, currentUserId, filter.toLowerCase(), {
    excludeBlocked: excludeBlocked === "true",
    excludeEmail: excludeEmail || null,
    searchBy: searchBy || "both",
  });
  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "fetched search results",
    users
  );
};
