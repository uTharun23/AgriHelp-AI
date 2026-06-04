# 🌱 AgriSight AI — Premium Smart Agriculture Hub

AgriSight AI is an advanced, premium-tier smart farming analytics and diagnostic platform. It leverages computer vision leaf diagnostics, real-time simulated IoT telemetry, micro-climate weather analysis, and a custom conversational AI assistant to deliver optimized agronomic insights for sustainable farming.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FuTharun23%2FAgriHelp-AI)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FuTharun23%2FAgriHelp-AI)

---

## 🌐 Deploying Your Live Demo

Because this project has just been pushed to GitHub, you need to initiate the deployment inside your own Vercel or Render account to make the live link active. Choose one of the easy methods below:

### Method A: One-Click Deploy (Recommended)
1.  Click the **Deploy with Vercel** button above.
2.  Log in with your GitHub account.
3.  Choose a name for your project repository and click **Create**. Vercel will clone, build, and host the live link for you automatically!

### Method B: Manual Git Connection
1.  Go to [Vercel Dashboard](https://vercel.com) (or [Render Dashboard](https://render.com)).
2.  Click **Add New** > **Project** and select the **`AgriHelp-AI`** repository from your GitHub list.
3.  Vercel will detect the `vercel.json` config and deploy it automatically. Once completed, it will provide your unique active live URL!

---

## ✨ Features & Capabilities

*   **📷 AI Crop Vision Scanner**: Drag and drop leaf photos to trace crop diseases. Operates on a lightweight pixel color-distribution traversal algorithm to map healthy vs. diseased tissue ratios.
*   **🎯 Target Bounding Boxes**: Instantly highlights targeted disease spots on the image preview using HTML5 `<canvas>` bounding boxes.
*   **⚡ Live IoT Soil Telemetry**: Streaming metrics from mock sensor arrays tracking Soil Moisture, Temperature, pH, and Nitrogen-Phosphorus-Potassium (NPK) values. Includes dynamic CSS conic gradients.
*   **⚙️ Actuator Action Controllers**: Trigger irrigation drip lines, ventilate greenhouse zones, fertilize soil, or distribute lime neutralizers with real-time reactive notification toasts.
*   **💬 AI Agronomy Chat Assistant**: A ChatGPT-style conversational advisory log with a custom Markdown-to-HTML parser rendering headers, bullet lists, blockquotes, and tables inline.
*   **🌤️ Agronomic Weather Insights**: Displays live metrics (OpenWeatherMap API) and generates custom crop indexes (Spraying suitability windows, Irrigation need levels, and Fungal Infection risks).
*   **🌓 Dual Theme Engine**: Seamless toggle between Eco-Light and Dark-Glassmorphism modes with user preference state persistence in `localStorage`.

---

## 🛠️ Tech Stack

*   **Backend**: Python, Flask, Pillow (PIL)
*   **Frontend**: HTML5 (Semantic), Vanilla CSS3 (Custom Glassmorphism, CSS Variables, Transitions), JavaScript (ES6, Fetch API)
*   **APIs**: OpenWeatherMap API
*   **Deployment**: Vercel & Render Ready

---

## 📸 Screenshots

<img width="1819" height="1087" alt="Crop Scanner Dashboard" src="https://github.com/user-attachments/assets/f9274f9c-7b0a-42a4-bc73-97f9d071ad95" />
<img width="1815" height="1028" alt="IoT Telemetry View" src="https://github.com/user-attachments/assets/c58c34b7-7e3e-479e-a982-40de94ca853d" />

---

## 🚀 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/uTharun23/AgriHelp-AI.git
    cd AgriHelp-AI
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Boot up the application:
    ```bash
    python app.py
    ```
4.  Open your browser and navigate to:
    ```text
    http://127.0.0.1:5000
    ```

---

## 👨‍💻 Developed By

### Tharun Ummadala
B.Tech Information Technology Student
*   **GitHub**: [https://github.com/uTharun23](https://github.com/uTharun23)
*   **LinkedIn**: [https://linkedin.com/in/tharunummadala](https://linkedin.com/in/tharunummadala)

---

## ⭐ Project Scope
Developed for learning purposes, portfolios, smart agriculture innovation showcase, and academic presentation.
