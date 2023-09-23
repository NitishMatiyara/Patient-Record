import mongoose from "mongoose";

// Database configuration
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "geekshop",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Mongo db Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
