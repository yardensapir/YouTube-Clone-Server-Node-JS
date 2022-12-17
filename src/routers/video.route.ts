import express from "express";
import { updateVideoHandler, uploadVideoHandler } from "../controllers/video.controller";
import requireUser from "../middlewares/requireUsers";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch('/:videoId',requireUser, updateVideoHandler)
export default router;
