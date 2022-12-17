import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signJwt } from "../modules/auth/auth.utils";
import { findUserByEmail } from "../services/user.services";
// import enviorments from "../config/enviorments";
import omit from "../helpers/omit";
import { LoginBody } from "../modules/auth/auth.schema";

export const authUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }
  const payload = omit(user.toJSON(), ["password", "__v"]);
  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    // set enviorment var before production
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    // set secure to true before production
    secure: false,
  });

  res.status(StatusCodes.OK).send(jwt);
};
