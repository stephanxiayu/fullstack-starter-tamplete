import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod"; // «{ z }» statt Default-Import!

// --- Helfer ---
const sendZodError = (res: Response, error: z.ZodError): void => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

// --- Error-Middleware ---
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return sendZodError(res, error);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
