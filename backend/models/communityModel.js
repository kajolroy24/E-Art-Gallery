import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { minimize: false }
);
const communityModel =
  mongoose.models.community || mongoose.model("community", communitySchema);
export default communityModel;
