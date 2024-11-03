import dotenv from "dotenv";
import express from "express";
import Bot from "./utils/bot.js";
dotenv.config();

// Server
const app = express();
app.get("/", (req, res) => {
  res.send(".");
});
app.listen(process.env.PORT, () => {
  console.log(`Port : ${process.env.PORT}`);
});

// Bot
Bot(process.env.TOKEN);