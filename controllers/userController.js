import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const newUser = { ...req.body };

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  } catch (error) {
    console.log(error);
  }

  res.status(StatusCodes.OK).json({ msg: "update user" });
};
