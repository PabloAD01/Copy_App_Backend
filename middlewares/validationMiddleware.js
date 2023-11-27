import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/CustomErrors.js";
import mongoose from "mongoose";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnAuthorizedError("not authorized to access this job");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB ID");
    const product = await Product.findById(value);
    if (!product) throw new NotFoundError(`no product with id ${id}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === product.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnAuthorizedError("not authorized to access this product");
    }
  }),
]);

export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("phone")
    .isNumeric()
    .withMessage("phone must be a number")
    .isLength({
      max: 9,
    })
    .withMessage("phone must be at least 9 digits long"),
]);
