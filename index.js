import "dotenv/config";

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { setupSwagger } from "./swagger.js";
import authRoutes from "./routes/auth.js";
import gadgetRoutes from "./routes/gadgets.js";

export const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);

app.get("/api/check", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
