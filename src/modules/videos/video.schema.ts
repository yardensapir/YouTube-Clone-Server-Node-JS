import { boolean, object, string, TypeOf } from "zod";

export const unpdateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    published: boolean(),
  }),
  params: object({
    videoId: string(),
  }),
};

export type UpdateVideoBody = TypeOf<typeof unpdateVideoSchema.body>;
export type UpdateVideoParams = TypeOf<typeof unpdateVideoSchema.params>;
