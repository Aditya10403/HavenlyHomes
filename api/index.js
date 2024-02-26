import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((error) => {
    console.log("App service :: connection :: error : ", error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
