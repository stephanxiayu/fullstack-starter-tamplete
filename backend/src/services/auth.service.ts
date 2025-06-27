import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerificationCodetype from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  appAssert(!existingUser, CONFLICT, "Email already in use");
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodetype.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  const refreshToken = jwt.sign(
    {
      sessionId: session._id,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );
  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );
  return { user: user.omitPassword(), accessToken, refreshToken };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or Password");

  const isValid = user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or Password");

  const userId = user._id;
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = { session: session._id };
  const refreshToken = jwt.sign(
    {
      sessionInfo,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );
  const accessToken = jwt.sign(
    { ...sessionInfo, userId: user._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );
  return { user: user.omitPassword(), accessToken, refreshToken };
};
