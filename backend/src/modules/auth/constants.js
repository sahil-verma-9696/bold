export const USER_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  ROLE: "role",
  AVATAR: "avatar",
  IS_VERFIED: "isVerified",
  RESET_TOKEN: "resetToken",
};

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dfqdx3ieb/image/upload/v1742281653/default_user.png";

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
export const RESPONSE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

export const MESSAGES = {
  LOGS: {
    // auth.controller.js
    SIGNUP_HIT: "Signup route hit",
    LOGIN_HIT: "Login route hit",
    LOGOUT_HIT: "Logout route hit",
    Getme_AUTH_HIT: "Getme route hit",

    USER_EXISTS: "User already Exists: {}",
    USER_CREATED: "User created successfully: {}",
    USER_LOGGED_IN: "User logged in successfully: {}",
    USER_LOGGED_OUT: "User logged out successfully",
    USER_AUTH_SUCCESS: "User authenticated successfully: {}",

    MISSING_FIELDS: "Missing required fields: {}",
    INVALID_CREDENTIALS: "Invalid credentials",
    ERROR_OCCURED: "Error occurred: {}",

    // user.controller.js
    PROFILE_HIT: "Profile route hit",
    SEARCH_USERS_HIT: "Search users route hit",
    PROFILE_UPDATE_HIT: "Update profile route hit",

    PROFILE_FETCHED: "User profile fetched successfully: {}",

    PROFILE_UPDATED: "Profile updated successfully: {}",

    // message.controller.js
    GET_USERS_HIT: "Fetching sidebar users...",
    GET_MESSAGES_HIT: "Fetching messages...",
    SEND_MESSAGE_HIT: "Sending message...",

    GET_USERS_SUCCESS: "Users fetched successfully.",
    GET_MESSAGES_SUCCESS: "Messages fetched successfully.",

    MESSAGE_SAVED: "Message saved successfully.",
    MESSAGE_EMITTED: "Message emitted to user {} successfully.",

    IMAGE_UPLOADED: "Image uploaded successfully.",
  },
  RESPONSE: {
    // auth.controller.js
    USER_CREATED: "User created successfully",
    LOGGED_IN: "Logged in successfully",
    LOGGED_OUT: "Logged out successfully",
    AUTH_SUCCESS: "User authenticated successfully",
    MISSING_FIELDS: "Missing required fields: {}",
    INVALID_CREDENTIALS: "Invalid credentials",
    ERROR_OCCURED: "Something went wrong",

    // user.controller.js
    PROFILE_FETCHED: "User profile fetched successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    USER_NOT_FOUND: "User does not exist",
    FEATURE_NOT_IMPLEMENTED: "This feature is not implemented yet",

    // message.controller.js
    GET_USERS_SUCCESS: "Users fetched successfully.",
    GET_MESSAGES_SUCCESS: "Messages fetched successfully.",
    MESSAGE_SENT: "Message sent successfully.",
    MESSAGE_EMPTY: "Message text or image is required.",
    IMAGE_UPLOAD_FAILED: "Failed to upload image.",
    GENERIC_ERROR: "Something went wrong. Please try again.",
  },
};

export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    ME: "/me",
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
