import express from "express";
import { processRequestBody } from "zod-express-middleware";
import * as authController from "../controllers/auth.controller";
import { loginSchema } from "../modules/auth/auth.schema";

const router = express.Router();

router.post("/", processRequestBody(loginSchema.body), authController.authUser);

export default router;
