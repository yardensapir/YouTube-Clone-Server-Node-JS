import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "../modules/user/user.schema";
import { createUser } from "../services/user.services";

export const registerUser = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exsists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
