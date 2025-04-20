import { logInfo } from "../../../utils/logger.js";
import { setCookie } from "../../../utils/cookieSetter.js";
import { generateTokens } from "../../../utils/tokenGenerator.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { DEFAULT_AVATAR, User } from "../../user/models/user.js";
import { sendResponse } from "../../../utils/response.js";

export async function signup(req, res) {
  logInfo(import.meta.url, "📩 Signup route hit");

  const { email, password, role, avatar } = req.body;
  if (!email || !password) {
    throw new Error("Please provide name, email, password");
  }

  const userExists = await User.findOne({
    email: email.trim().toLowerCase(),
  });
  if (userExists) {
    throw new Error(`${email} already exists`);
  }

  const user = await User.create({
    name: email.trim().toLowerCase().split("@")[0],
    email: email.trim().toLowerCase(),
    password: password.trim(),
    role,
    avatar: avatar === "" ? DEFAULT_AVATAR : avatar,
  });

  const { accessToken } = generateTokens(user._id);
  setCookie(res).setAccessToken(accessToken);


  const userObj = user.toObject();
  delete userObj.password;

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    `${userObj.name} signup successfully`,
    {
      user: userObj,
    }
  );
}
