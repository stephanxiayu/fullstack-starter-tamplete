import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToDatabse from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";

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
app.get("/", async (req, res, next) => {
  try {
    throw new Error("unhandable");
    res.send("I am alive, juhuu!");
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(4004, async () => {
  console.log(`server runs at ${PORT} at ${NODE_ENV}`);
  await connectToDatabse();
});
