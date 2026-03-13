const express = require("express");
const { sequelize, Track } = require("./database/setup");

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/api/tracks", async (req, res) => {
  try {

    const tracks = await Track.findAll();
    res.json(tracks);

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tracks" });
  }
});


app.get("/api/tracks/:id", async (req, res) => {
  try {

    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.json(track);

  } catch (error) {
    res.status(500).json({ error: "Error retrieving track" });
  }
});


app.post("/api/tracks", async (req, res) => {
  try {

    const { songTitle, artistName, albumName, genre } = req.body;

    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTrack = await Track.create(req.body);

    res.status(201).json(newTrack);

  } catch (error) {
    res.status(500).json({ error: "Failed to create track" });
  }
});

app.put("/api/tracks/:id", async (req, res) => {
  try {

    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    await track.update(req.body);

    res.json(track);

  } catch (error) {
    res.status(500).json({ error: "Failed to update track" });
  }
});

app.delete("/api/tracks/:id", async (req, res) => {
  try {

    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    await track.destroy();

    res.json({ message: "Track deleted" });

  } catch (error) {
    res.status(500).json({ error: "Failed to delete track" });
  }
});

app.listen(PORT, async () => {

  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }

  console.log(`Server running on http://localhost:${PORT}`);
});