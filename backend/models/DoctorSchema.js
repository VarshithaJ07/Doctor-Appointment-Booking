import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number },
    ticketPrice: { type: Number, required: true },
    photo: { type: String },
    hospital: { type: String, default: "City Health Center" },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
