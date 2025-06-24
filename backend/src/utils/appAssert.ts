import assert from "node:assert";
import AppError from "./AppError";
const appAssert = (condition: any, httpStatusCode, message, appErrorCode) =>
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));
