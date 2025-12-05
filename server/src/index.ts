import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "Server is running correctly!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
