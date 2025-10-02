import express from "express";
import multer from "multer";
import { Client, handle_file } from "@gradio/client"; // note: handle_file is needed
import path from "path";

const app = express();
const port = 3000;

// Configure multer to keep files in memory instead of saving
const upload = multer({ storage: multer.memoryStorage() });

// Serve static files
app.use(express.static("../docs"));

let gradioClient;
(async () => {
  gradioClient = await Client.connect(
    "mdfaisalahmed025/electronic-component-recognizer"
  );
})();

// POST endpoint (no disk save)
app.post("/predict", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // req.file.buffer contains the raw image data in memory
    const result = await gradioClient.predict("/predict", {
      image: handle_file(req.file.buffer, req.file.originalname),
    });

    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction failed", details: err.message });
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
