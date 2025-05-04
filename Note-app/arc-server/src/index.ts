import express, { Request, Response } from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import noteRoutes from "./routes/notes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});