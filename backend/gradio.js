import fs from "fs";
import { Client } from "@gradio/client";

// Connect to your Space
const app = await Client.connect(
  "mdfaisalahmed025/electronic-component-recognizer"
);

// Read a local image file as a Buffer
const imageFile = fs.readFileSync(
  "/Users/mdfaisal/Documents/GitHub/Electronic-Component-Recognizer/diode.png"
);

// Call predict with the required parameter
const result = await app.predict("/predict", { image: imageFile });

console.log(result.data);
