import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnAuthenticatedError } from "../errors/CustomErrors.js";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValid) throw new UnAuthenticatedError("invalid credentials");
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logOut = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
