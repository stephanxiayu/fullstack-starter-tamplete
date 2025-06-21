import mongoose from "mongoose";

const connectToDatabse = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("error connecting to mongo DB: ", error);
    process.exit(1);
  }
};
export default connectToDatabse;
