export const ROUTES = {
  USER: {
    BASE: "/api/user",
    ME: "/me",
    PROFILE: "/:id",
  },
};

export const MESSAGES = {
  LOGS: {
    Getme_HIT: "getMe() route hit",
    UpdateMe_HIT: "updateMe() route hit",
    DeleteMe_HIT: "deleteMe() route hit",

    GetProfile_HIT: "getProfile() route hit",

    
    USER_AUTH_SUCCESS: "User authenticated successfully: {}",
    ERROR_OCCURED: "Error occurred: {}",
    USER_FETCHED: "User with ID {} successfully fetched",
  },
  RESPONSE: {
    AUTH_SUCCESS: "User authenticated successfully",
    ERROR_OCCURED: "Something went wrong",
  },
};
