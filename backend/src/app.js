const express = require("express");
const path = require("path");
const songsRoutes = require("./routes/song.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// API routes
app.use("/", songsRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// React fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

module.exports = app;
