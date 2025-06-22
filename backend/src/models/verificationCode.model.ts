import mongoose from "mongoose";
import VerificationCodetype from "../constants/verificationCodeTypes";

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodetype;
  expiresAt: Date;
  createAt: Date;
}

const verficsationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verficsationCodeSchema,
  "verification_code"
);
export default VerificationCodeModel;
