import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUserInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUserInput, updateUser);

export default router;
