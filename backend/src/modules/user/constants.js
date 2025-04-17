export const ROUTES = {
  USER: {
    BASE: "/api/user",
    ALL: "/",
    ME: "/me",
    SETTING: "/setting",
    PROFILE: "/profile/:id",
    RELATIONSHIP: "/relationships/:type",

    FRIENDS: {
      SEND_REQUEST: "/friends/request/:id", // POST
      RESPOND_REQUEST: "/friends/respond/:id", // PATCH
      REMOVE_FRIEND: "/friends/remove/:id", // DELETE
    },
  },
};

export const MESSAGES = {
  LOGS: {
    Getme_HIT: "getMe() endpoint hit",
    UpdateMe_HIT: "updateMe() endpoint hit",
    GetSettings_HIT: "getSettings() endpoint hit",
    UpdateSettings_HIT: "✏️ updateSettings() HIT",
    GetProfile_HIT: "getProfile() endpoint hit",
    GetRelationshipsByStatus_HIT: "getRelationshipsByStatus() endpoint hit",
    GetAllUsers_HIT: "getAllUsers() endpoint hit",

    GetAllUsers_SUCCESS: "✅ All users fetched",

    GET_ALL_USERS_SUCCESS: "users fetched",
    SETTINGS_UPDATED: "✅ Settings updated for userId: {}",
    USER_AUTH_SUCCESS: "",
    ERROR_OCCURED: "Error occurred: {}",
    USER_FETCHED: "User with ID {} successfully fetched",
    SETTINGS_FETCHED: "User settings with ID {} successfully fetched",
  },
  RESPONSE: {
    GET_ALL_USERS_SUCCESS: "all users",
    AUTH_SUCCESS: "User authenticated successfully",
    ERROR_OCCURED: "Something went wrong",
  },
};
