import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";
import { usersRouter } from "./routes/users.routes";
import { authRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
connectDB();

//TODO: configure the cors options

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})