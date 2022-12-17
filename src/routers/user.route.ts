import express from "express";
import { processRequestBody } from "zod-express-middleware";
import * as userController from "../controllers/user.controller";
import requireUser from "../middlewares/requireUsers";
import { registerUserSchema } from "../modules/user/user.schema";
const router = express.Router();

router.post(
  "/",
  processRequestBody(registerUserSchema.body),
  userController.registerUser
);
router.get("/", requireUser, (req, res) => {
  return res.send(res.locals.user);
});

export default router;
