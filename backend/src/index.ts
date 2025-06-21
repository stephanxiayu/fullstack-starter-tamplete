import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("I am alive, juhuu!");
});

app.listen(4004, () => {
  console.log("server runs at 4004");
});
