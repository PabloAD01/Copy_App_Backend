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
  .get(getAllProducts)
  .post(authenticateUser, upload, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .get(getSinglePremiumProduct)
  .patch(updateProduct)

  .delete(deleteProduct);

export default router;
