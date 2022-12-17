import { Video, VideoModel } from "../modules/videos/video.model";

export const createVideo = ({ owner }: { owner: string }) => {
  return VideoModel.create({ owner });
};

export const findVideo = (videoId: Video["videoId"]) => {
  return VideoModel.findOne({ videoId });
};
