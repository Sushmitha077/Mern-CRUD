import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern_users")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
