import { CREATED, OK } from "../constants/http";
import { createAccount, loginUser } from "../services/auth.service";
import catchErrors from "../utils/catchErros";
import z from "zod";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login Successfull" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload, error } = verifyToken(accessToken);
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout Successfull",
  });
});
