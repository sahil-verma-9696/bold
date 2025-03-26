export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh-token",
    CHECK: "/check",
  },

  USER: {
    BASE: "/api/user",
    PROFILE: "/profile", // Get user profile ✅
    UPDATE: "/update-profile", // Update user profile ✅
    SEARCH: "/search", // Search users by name/skills
    DELETE: "/delete-account", // Delete user account
  },

  MESSAGE: {
    BASE: "/api/messages",
    GET_MESSAGE: "/:id",
    POST_MESSAGE: "/:id",
    GET_SIDEBAR_USERS: "/users",
  },
};
