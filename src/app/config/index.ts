import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  NODE_ENV:process.env.NODE_ENV,
  JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN ,
  store_id:process.env.STORE_ID,
  signature_key:process.env.SIGNATURE_KEY,
  payment_url:process.env.PAYMENT_URL
};
