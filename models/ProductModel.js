import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  description: String,
  price: String,
  uploaded: String,
  location: String,
  like: Boolean,
});

export default mongoose.model("Product", productSchema);
