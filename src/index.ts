import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";
import { usersRouter } from "./routes/users.routes";
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})