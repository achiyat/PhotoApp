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

// Route to handle photo search
app.get("/pixabay/images", async (req, res) => {
  console.log(`App geting!`);
  const { search, perPage } = req.query;
  console.log(search, perPage);

  try {
    const response = await axios.get(process.env.BASE_URL, {
      params: {
        key: process.env.API_KEY,
        q: search,
        image_type: "photo",
        lang: "en",
        per_page: perPage,
      },
    });

    console.log(response.data.hits[0].id);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching photo data:", error);
    res.status(500).send("Error fetching photo data");
  }
});

// Start the server and listen on port 3000 or 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(process.env.BASE_URL);
  console.log(process.env.API_KEY);
  console.log(`Server is running on http://localhost:${PORT}`);
});
