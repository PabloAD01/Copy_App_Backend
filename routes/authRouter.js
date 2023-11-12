import { Router } from "express";
const router = Router();
import {
  login,
  register,
  logOut,
  registerWithLogin,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validationMiddleware.js";

router.post("/register", validateRegister, registerWithLogin);
router.post("/login", validateLogin, login);
router.get("/logout", logOut);

export default router;
