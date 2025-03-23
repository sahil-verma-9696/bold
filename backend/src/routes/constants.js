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
    CONNECTIONS: "/connections", // List user's connections (friends/colleagues)
    FOLLOW: "/:id/follow", // Follow/unfollow users (optional)
    PREFERENCES: "/preferences", // Update user preferences
    DELETE: "/delete-account", // Delete user account
  },
};
