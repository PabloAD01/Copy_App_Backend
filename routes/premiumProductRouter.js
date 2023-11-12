import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getAllPremiumProducts,
  createProduct,
  createPremiumProduct,
  getSingleProduct,
  getSinglePremiumProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

router
  .route("/")
  .get(getAllPremiumProducts)
  .post(authenticateUser, upload, createPremiumProduct);

router.route("/:id").get(getSinglePremiumProduct);

export default router;
