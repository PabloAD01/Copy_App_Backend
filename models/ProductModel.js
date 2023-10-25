import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  description: String,
  price: String,
  uploaded: String,
  location: String,
  like: Boolean,
  cords: {
    long: Number,
    lat: Number,
    longd: Number,
    latd: Number,
  },
  like: Boolean,
  uploaded: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  info: {
    type: Object,
    default: {},
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Product", productSchema);
