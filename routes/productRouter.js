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

router
  .route("/")
  .get(getAllProducts)
  .get(getAllPremiumProducts)
  .post(createProduct)
  .post(createPremiumProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .get(getSinglePremiumProduct)
  .patch(updateProduct)

  .delete(deleteProduct);

export default router;
