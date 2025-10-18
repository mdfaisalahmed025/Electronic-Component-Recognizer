# Electronic Component Recognizer

This project is an end-to-end pipeline for building an image classification system that can recognize and classify electronic components. It covers the entire workflow — from **data collection, data cleaning, training, evaluation, and deployment** to **API integration with a live demo**.

The model is designed to classify **20 different types of commonly used electronic components** in circuits, prototyping, and hardware systems.

### Supported Component Classes

1. Resistor
2. Capacitor
3. Diode
4. Transistor
5. IC Chip
6. Relay
7. Switch
8. Transformer
9. LED
10. Connector
11. Potentiometer
12. Fuse
13. Inductor Coil
14. Crystal Oscillator
15. Heat Sink
16. Breadboard
17. Jumper Wire
18. Battery Holder
19. Power Supply Module
20. Microcontroller Board

---

## 🧾 Dataset Preparation

Building a reliable dataset was the most challenging and time-consuming part of the project.

**Data Collection**: 
A total of **3,686 images** were scraped from online sources (mainly **DuckDuckGo Image Search**) using component-specific search terms.  
Each class was carefully named to ensure the model learns the actual characteristics of the component (e.g., *resistor*, *capacitor*, *IC chip*).

**Data Cleaning**: 
After manual inspection and filtering with the **fastai ImageClassifierCleaner**, **25 noisy or irrelevant images** were excluded (e.g., schematic diagrams, logos, and non-electronic objects).  
The final dataset consisted of **3,661 cleaned images**.  

Data cleaning was essential to improve accuracy and prevent bias from mislabeled or low-quality samples.

**DataLoader Setup**:
The dataset was prepared using the **fastai DataBlock API**, which simplified defining training and validation splits, applying transformations, and creating the dataloaders for the training pipeline.

**Data Augmentation**:
  fastai provides default GPU-based data augmentation such as rotations, zoom, lighting adjustments, and flipping. These augmentations helped improve the robustness of the model and prevented overfitting.

More details, including preprocessing steps and data inspection, are documented in `notebooks/data_collection_and_pre_proccessing_and_training_latest.ipynb`

# Training and Data Cleaning

- **Model Training:**  
  A **ResNet34** convolutional neural network, pre-trained on ImageNet, was fine-tuned on our dataset. The model was trained for multiple epochs in different cycles, each time improving accuracy and reducing validation loss.

After several iterations, the model achieved **97%** validation accuracy. This demonstrates the model’s robustness and strong generalization capabilities, even when trained on a noisy and diverse dataset

- **Data Cleaning:**  
  Data cleaning was the most time-intensive step. Since the dataset was web-scraped, many irrelevant or noisy images were included (for example, schematic diagrams, logos, or unrelated objects).  
  The **fastai ImageClassifierCleaner** was used after each training cycle to manually review and remove incorrect or misleading samples.  
  This iterative process of _train → clean → retrain_ significantly improved the model’s performance and generalization ability.

---


## 📊 Model Benchmarking

As per project requirements, at least **three models** were trained and compared to evaluate performance and generalization capability.

| Model | Architecture |      Validation Accuracy | Training Time | Remarks |
|:------|:--------------|:--------------------|:---------------|:---------|
| **Model 1** | ResNet50 |      83.8%          | ~10 min | Baseline model |
| **Model 2** | ResNet34 |    **97.0%**        | ~16 min | Best overall accuracy |
| **Model 3** | EfficientNet_B0 | 96.4%        | ~20 min  | Balanced accuracy and efficiency |

> ✅ **Conclusion:**  
> ResNet34 achieved the best tradeoff between training time and accuracy.  
> EfficientNet_B0 also performed competitively, offering slightly better efficiency but requiring more computation.  
> Overall, the experiments demonstrate that increasing model depth and input resolution improves classification performance.


**Confusion Matrix**

To evaluate the model’s performance across different component classes, a **confusion matrix** was generated using the validation dataset.  
It provides a visual representation of how well the model distinguishes between various component types.

<p align="center">
  <img src="/app/confusion-matrix.png" width="600" height="400" alt="Confusion Matrix"/>
</p>

> ✅ **Interpretation:**  
> - The diagonal cells indicate correctly classified samples.  
> - Off-diagonal values represent misclassifications between visually similar components (e.g., resistor vs. capacitor).  
> - A strong diagonal trend shows the model achieved high precision and recall across all classes.


# Model Deployment

Once the model reached satisfactory performance, it was deployed to **Hugging Face Spaces** using **Gradio**.

- Gradio provides an interactive UI where users can upload an image of an electronic component and instantly receive predictions with confidence scores.
- The deployed model can be accessed here: [HuggingFace Space](https://huggingface.co/spaces/mdfaisalahmed025/electronic-component-recognizer).
- Implementation scripts for deployment can be found in the `deployment` folder.

## Interactive Gradio Interface for Component Recognition

<p align="center">
  <img src="app/gradio_app.png" width="750" height="400" alt="Gradio App Screenshot"/>
</p>

## Deployed Application Web Page

<p align="center">
  <img src="app/app page.png" width="750" height="400" alt="Application Web Page Screenshot"/>
</p>

---

# API Integration with GitHub Pages

To make the model more accessible and user-friendly, the deployed Hugging Face API was integrated into a **GitHub Pages website**.

- The GitHub Pages site allows users to upload an image directly from their browser.
- The image is sent to the Hugging Face API endpoint, which returns predictions that are displayed on the page.
- This provides a clean and interactive frontend for the model without requiring users to install anything locally.

🔗 Live Demo: [Electronic Component Recognizer Website](https://mdfaisalahmed025.github.io/Electronic-Component-Recognizer/)

The website implementation and scripts for API communication can be found in the `docs` and `backend` folder.

---

# Future Work

- Expanding the dataset to include more diverse angles and real-world usage of components.
- Training deeper models like ResNet50 or EfficientNet for improved accuracy.
- Building a mobile-friendly interface for engineers and students to use on-the-go.
- Integrating with hardware learning platforms (e.g., Arduino kits) for real-time recognition.

---

# Conclusion

The **Electronic Component Recognizer** demonstrates the power of transfer learning and end-to-end ML pipelines — from raw data collection to deployment as a usable web application.  
It has applications in **education, prototyping, inventory management, and automated electronic system design**.

This project showcases a practical workflow for turning an idea into a real, user-facing application powered by machine learning.

# ⚙️ Run and Installation of the Project

Follow the steps below to set up and run the **Electronic Component Recognizer** project on your local machine.

---

# Build from source

##  Clone the Repository

```bash
git clone https://github.com/mdfaisalahmed025/Electronic-Component-Recognizer.git
cd Electronic-Component-Recognizer

## Install dependencies

```bash
pip install -U pip
pip install -r requirements.txt


# 📞 Contact / Author

**Project Maintainer:** Md Faisal Ahmed  
**Portfolio:** [mdfaisalahmed.online](https://mdfaisalahmed.online/)  
**GitHub:** [@mdfaisalahmed025](https://github.com/mdfaisalahmed025)  