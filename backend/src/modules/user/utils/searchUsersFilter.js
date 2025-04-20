import { User } from "../models/user.js";

export const searchUsers = async (
  query,
  currentUserId,
  filter = "all",
  options = {}
) => {
  try {
    if (!query) return [];

    const {
      excludeBlocked = false,
      excludeEmail = null,
      searchBy = "both",
    } = options;

    const regex = new RegExp(query, "i");

    const currentUser = await User.findById(currentUserId).select(
      "friends blocked requests pending"
    );
    if (!currentUser) return [];

    const relationshipMap = {
      friends: currentUser.friends,
      blocked: currentUser.blocked,
      requests: currentUser.requests,
      pending: currentUser.pending,
    };

    const baseFilter = {};

    // Set search criteria
    if (searchBy === "name") {
      baseFilter.name = regex;
    } else if (searchBy === "email") {
      baseFilter.email = regex;
    } else {
      baseFilter.$or = [{ name: regex }, { email: regex }];
    }

    // Filter by relationship group
    if (filter !== "all" && relationshipMap[filter]) {
      baseFilter._id = { $in: relationshipMap[filter] };
    }

    // Exclude blocked users
    if (excludeBlocked && currentUser.blocked.length > 0) {
      baseFilter._id = {
        ...(baseFilter._id || {}),
        $nin: currentUser.blocked,
      };
    }

    // Exclude specific email
    if (excludeEmail) {
      baseFilter.email = {
        ...(baseFilter.email || {}),
        $ne: excludeEmail,
      };
    }

    // ✅ Add sorting by name lexicographically (ascending)
    const users = await User.find(baseFilter)
      .select("name email avatar username")
      .sort({ name: 1 }); // 1 = ascending, -1 = descending

    return users;
  } catch (err) {
    console.error("Error in searchUsers:", err);
    return [];
  }
};
