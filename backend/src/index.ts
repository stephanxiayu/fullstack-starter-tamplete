import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToDatabse from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErros";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.routes";
import authenticate from "./middleware/authenticate";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
// app.get(
//   "/",
//   catchErrors(async (req, res, next) => {
//     // throw new Error("unhandable");
//     res.status(OK).json({ status: "I am alive" });
//   })
// );

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server runs at ${PORT} at ${NODE_ENV}`);
  await connectToDatabse();
});
