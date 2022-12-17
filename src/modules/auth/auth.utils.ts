import jwt from "jsonwebtoken";
import enviorments from "../../config/enviorments";

const JWT_SECRET = enviorments.JWT_SECRET || "changeme";
const EXPIRES_IN = enviorments.EXPIRES_IN || "7d";

export const signJwt = (payload: string | Buffer | object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
  
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
