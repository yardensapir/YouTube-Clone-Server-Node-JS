import busboy from "busboy";
import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { Video } from "../modules/videos/video.model";
import { UpdateVideoBody, UpdateVideoParams } from "../modules/videos/video.schema";
import { createVideo, findVideo } from "../services/video.srvice";

const MIME_TYPES = ["video/mp4", "video/mov"];

function getPath({
  videoId,
  extension,
}: {
  videoId: Video["videoId"];
  extension: Video["extension"];
}) {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
}

export const uploadVideoHandler = async (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });

  const user = res.locals.user;

  const video = await createVideo({ owner: user._id });

  bb.on("file", async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type");
    }

    const extension = info.mimeType.split("/")[1];

    const filePath = getPath({ videoId: video.videoId, extension });

    video.extension = extension;

    await video.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: "close",
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(video));
    res.end();
  });
  return req.pipe(bb);
};

export const updateVideoHandler = async (req: Request<UpdateVideoParams,{},UpdateVideoBody>, res: Response) => {
  const { videoId } = req.params;
  const {title,description,published} = req.body
  
  const { _id: userId } = res.locals.user;

  const video = await findVideo(videoId);
  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("video not found");
  }
  if (String(video.owner) !== String(userId)) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  video.title = title;
  video.description = description;
  video.published = published;

  await video.save();

  return res.status(StatusCodes.OK).send(video);
};
