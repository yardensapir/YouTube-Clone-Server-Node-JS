import express from "express";
import { findVideosHandler, stremVideoHandler, updateVideoHandler, uploadVideoHandler } from "../controllers/video.controller";
import requireUser from "../middlewares/requireUsers";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch('/:videoId',requireUser, updateVideoHandler)
router.get('/',findVideosHandler)
router.get('/:videoId',stremVideoHandler)
export default router;
