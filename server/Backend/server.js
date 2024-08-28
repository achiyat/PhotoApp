// server/Backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get the current directory of the server.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "../../client")));

// Route to handle home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages", "home.html"));
});

// Start the server and listen on port 3000 or 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(process.env.BASE_URL);
  console.log(process.env.PIXABAY_API_KEY);
  console.log(`Server is running on http://localhost:${PORT}`);
});
