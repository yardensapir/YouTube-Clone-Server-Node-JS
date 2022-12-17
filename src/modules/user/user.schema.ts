import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "user name is required",
    }),
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 charchters long")
      .max(64, "Password should not be longer than 64 charchters"),
    confirmPassword: string({
      required_error: "user name is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  }),
};
export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>
