import express from "express";
import multer from "multer";
import fs from "fs";
import { Client } from "@gradio/client";
import path from "path";

const app = express();
const port = 3000;

// Configure multer to handle file uploads
const upload = multer({ dest: "uploads/" });
// Serve static files (HTML frontend)
app.use(express.static("../public"));

let gradioClient;
(async () => {
  gradioClient = await Client.connect(
    "mdfaisalahmed025/electronic-component-recognizer"
  );
})();

// POST endpoint to handle image upload
app.post("/predict", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const imageBuffer = fs.readFileSync(req.file.path);

    // Call Gradio Space
    const result = await gradioClient.predict("/predict", {
      image: imageBuffer,
    });

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction failed", details: err.message });
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
