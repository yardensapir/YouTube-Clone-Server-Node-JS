import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const hash = await argon2.hash(user.password);
    user.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    const user = this;
    return argon2.verify(user.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
