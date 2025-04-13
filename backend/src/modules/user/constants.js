export const ROUTES = {
  USER: {
    BASE: "/api/user",

    ME: "/me",
    UPDATE: "/update-profile", // Update user profile ✅
    SEARCH: "/search", // Search users by name/skills
    DELETE: "/delete-account", // Delete user account
  },
};

export const MESSAGES = {
  LOGS: {
    Getme_AUTH_HIT: "Getme route hit",
    USER_AUTH_SUCCESS: "User authenticated successfully: {}",
    ERROR_OCCURED: "Error occurred: {}",
  },
  RESPONSE: {
    AUTH_SUCCESS: "User authenticated successfully",
    ERROR_OCCURED: "Something went wrong",
  },
};
