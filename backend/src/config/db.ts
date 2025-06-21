import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabse = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("successfuly connected to mongo DB: YuHU!");
  } catch (error) {
    console.log("error connecting to mongo DB: ", error);
    process.exit(1);
  }
};
export default connectToDatabse;
