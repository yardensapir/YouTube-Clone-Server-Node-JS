import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password must not be longer than 64 characters"),
  })
}; 

export type LoginBody = TypeOf<typeof loginSchema.body>
