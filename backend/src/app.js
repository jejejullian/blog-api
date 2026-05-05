import express from "express";
import cors from "cors";

import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.get("/api/health", (req, res) => {
  res.send("server ok");
});

app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
