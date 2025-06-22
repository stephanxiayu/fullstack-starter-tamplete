import UserModel from "../models/user.model";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  if (existingUser) {
    throw new Error("User already exist");
  }
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });
};
