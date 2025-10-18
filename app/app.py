from fastai.vision.all import *
from fastai.vision.all import load_learner, PILImage
import gradio as gr
from pathlib import Path


electronic_labels = [
    "resistor",
    "capacitor",
    "diode",
    "transistor",
    "ic chip",
    "relay",
    "switch",
    "transformer",
    "led",
    "connector",
    "potentiometer",
    "fuse",
    "inductor coil",
    "crystal oscillator",
    "heat sink",
    "breadboard",
    "jumper wire",
    "battery holder",
    "power supply module",
    "microcontroller board"
]


# Check file exists
model_path = Path(f"component-recognizer-v6.pkl")
print(f"Loading model from {model_path}")
if not model_path.exists():
    raise FileNotFoundError(f"Model file not found at {model_path}")

# Load model
try:
    model = load_learner(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

def recognize_image(image):
    # Ensure RGB
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Predict with fastai model
    img = PILImage.create(image)
    pred, idx, probs = model.predict(img)

    # Get flat list of labels
    labels = model.dls.vocab
    if isinstance(labels[0], (list, tuple)):
        labels = labels[0]

    # Map labels to float probs
    probs = list(map(float, probs))
    result = {lab: p for lab, p in zip(labels, probs)}

    # Sort descending so Gradio shows top first
    return dict(sorted(result.items(), key=lambda x: x[1], reverse=True))


# Gradio interface

image = gr.Image(type="pil", height=192, width=192)
label = gr.Label(num_top_classes =5)

examples = [
    'test_images/Breadboard.jpg',
    'test_images/ic-chip.png',
    'test_images/battery-holder.jpg',
    'test_images/diode.png',
    'test_images/transistor.jpg',
    'test_images/connector.webp',
]

iface = gr.Interface(
    fn=recognize_image,
    inputs=image,
    outputs=label,
    examples=examples
)

iface.launch(inline=False, share=True)