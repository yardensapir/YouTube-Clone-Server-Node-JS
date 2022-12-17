import mongoose from "mongoose";
import enviorments from "../config/enviorments";
import logger from "../utils/logger";

const MONGODB_CONNECTION_STRING =
  enviorments.MONGO_DB_URL || "mongodb://localhost:27017/youtube_clone";

export const connectToDataBase = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    logger.info("Connected to MongoDB database");
  } catch (error) {
    logger.error(error, "Faild To connect to database");
    process.exit(1);
  }
};

export const disconnectFromDataBase = async () => {
  await mongoose.connection.close();
  logger.info("Disconnect from database");
  return;
};
