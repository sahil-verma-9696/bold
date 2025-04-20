import { logInfo } from "../../../utils/logger.js";
import { setCookie } from "../../../utils/cookieSetter.js";
import { generateTokens } from "../../../utils/tokenGenerator.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../../user/models/user.model.js";
import { sendResponse } from "../../../utils/response.js";

export async function login(req, res) {
  logInfo(import.meta.url, "🔐 Login route hit");

  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user || !user.password || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }

  const { accessToken } = generateTokens(user._id);
  setCookie(res).setAccessToken(accessToken);

  const userObj = user.toObject();
  delete userObj.password;

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    `${userObj.name} Logged in successfully`,
    { user: userObj }
  );
}
