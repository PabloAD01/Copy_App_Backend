import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//Routes
import productRouter from "./routes/productRouter.js";
import premiumProductRouter from "./routes/premiumProductRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//Middleware
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(express.json({ limit: "40mb" }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/premium_products", premiumProductRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

app.use(errorMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log(`Connected to database, running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
