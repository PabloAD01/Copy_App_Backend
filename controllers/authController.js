import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { UnAuthenticatedError } from "../errors/CustomErrors.js";
import User from "../models/UserModel.js";

/* export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isValid =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValid) throw new UnAuthenticatedError("invalid credentials");
    res.status(StatusCodes.OK).json({ msg: "user logged in" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message });
  }
};

export const logOut = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
 */

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const registerWithLogin = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const password = req.body.password;
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  req.body.password = password;
  login(req, res);
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isValid =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValid) throw new UnAuthenticatedError("Invalid Credentials");

    const token = createJWT({ userId: user._id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "user logged in", token });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message });
  }
};

export const logOut = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
