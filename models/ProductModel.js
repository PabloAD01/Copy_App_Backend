import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: String,
    title: String,
    description: String,
    price: String,
    cords: {
      long: Number,
      lat: Number,
      longd: Number,
      latd: Number,
    },
    like: {
      type: Boolean,
      default: false,
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
    imageUrls: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
