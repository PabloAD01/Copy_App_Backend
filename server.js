import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import morgan from "morgan";

import authRouter from "./routes/authRouter.js";

import {
  createProduct,
  getAllProducts,
  getAllPremiumProducts,
  createPremiumProduct,
} from "./controllers/productsController.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({ msg: "Users" });
});

app
  .get("/api/v1/products", getAllProducts)
  .post("/api/v1/products", createProduct);
app
  .get("/api/v1/premium_products", getAllPremiumProducts)
  .post("/api/v1/premium_products", createPremiumProduct);

app.use("/api/v1/auth", authRouter);

app.get("/*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log(`Connected to database, running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
