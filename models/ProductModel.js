import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: String,
    title: String,
    description: String,
    price: String,
    location: String,
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
    imageUrls: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
