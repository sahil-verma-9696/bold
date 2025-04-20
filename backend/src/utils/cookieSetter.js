export const COOKIE_CONST = {
  ACCESS_TOKEN: "accessToken",
};
export function setCookie(res) {
  return {
    setAccessToken: function (accessToken) {
      res.cookie(COOKIE_CONST.ACCESS_TOKEN, accessToken, {
        httpOnly: true, // prevent XSS attacks, cross-site script injection
        secure: true",
        sameSite: "strict", // prevent cross-site request forgery  CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    },
  };
}
