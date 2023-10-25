import { Router } from "express";
const router = Router();
import { login, register, logOut } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);

export default router;
