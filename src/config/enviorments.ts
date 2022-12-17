import dotenv from "dotenv";
dotenv.config();
const enviorments = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN,
  LOCAL_HOST: process.env.LOCAL_HOST
};

export default enviorments;
