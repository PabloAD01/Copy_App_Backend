import mongoose from "mongoose";

const premiumProductSchema = new mongoose.Schema({
  description: String,
  price: String,
  uploaded: String,
  location: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Premium_Product", premiumProductSchema);
