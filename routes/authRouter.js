import { Router } from "express";
const router = Router();
import { login, register, logOut } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logOut);

export default router;
