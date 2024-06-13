
import mongoose from "mongoose";

const DonorVolunteerSchema = new mongoose.Schema(
  {
    donorID: {
      type: String,
      required: true,
      unique: true,
    },
    donorName: {
      type: String,
      required: true,
    },
    donorAddress: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
    },
    programID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DonorVolunteer = mongoose.model("DonorVolunteer", DonorVolunteerSchema);
export default DonorVolunteer;
