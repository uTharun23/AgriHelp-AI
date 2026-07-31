# AgriSight AI — Specific Project Upgrade Prompt

This prompt specifies the exact features, components, and styling implemented during the premium upgrade of the **AgriHelp-AI** application into the **AgriSight AI** platform. Copy and paste this prompt into any AI coding assistant to recreate, expand, or document the exact functionality of this project.

---

```markdown
You are an expert full-stack developer and premium UI/UX designer. Your task is to upgrade my current "AgriHelp-AI" agriculture assistant prototype into a premium, state-of-the-art intelligent smart-farming analytics hub called "AgriSight AI". 

Maintain high-performance coding, write clean code without heavy dependencies (e.g., avoid TensorFlow, OpenCV, or deep learning libraries to keep deployment lightweight under 100MB), and follow these detailed technical specifications:

### 1. Brand Identity & Premium Layout (UI/UX)
- **Name & Styling**: Rebrand the app to "AgriSight AI". Use Google Fonts with 'Plus Jakarta Sans' for headers/UI buttons and 'Inter' for body copy.
- **Glassmorphic Design**: Implement a modern, premium design featuring translucent cards, subtle gradients (e.g., deep dark greens, glowing emeralds, and HSL slate grays), and clean spacing.
- **Dual Theme Engine**: Include a persistent Light/Dark mode toggler.
  - *Eco-Light*: A modern clean light UI with green accents.
  - *Dark-Glassmorphism*: A translucent, low-light backdrop with neon green/teal glowing borders.
  - Store the active theme state in `localStorage` so the user's preference persists across reloads.
- **Sidebar & Grid Layout**:
  - Implement a sidebar containing the branding logo, navigation tabs, a crop selection dropdown, and a persistent Crop Health Gauge card.
  - Prevent flexbox clipping or card squishing under small viewport heights by applying `flex-shrink: 0` to logo/nav elements, hidden scrollbar overflows to the sidebar, and custom CSS to override Chromium select options clashing text colors.

### 2. High-Tech Crop Health Scanner (Computer Vision Panel)
- **Frontend File Upload**: Build an interactive drag-and-drop file upload zone.
- **Scanning Animation**: Display a live image preview with a high-tech animated green laser scanner sweep overlay and progress bar once an image is selected.
- **Bounding Box Overlay**: Render an HTML5 `<canvas>` directly over the loaded image preview to dynamically draw targeted, glowing red bounding boxes around coordinates returned by the leaf diagnostic API.
- **Backend Classifiers (/scan)**:
  - In `app.py`, implement the `/scan` endpoint utilizing `Pillow` (PIL) for lightweight, rapid image processing.
  - Resize uploaded images to 100x100 pixels. Traverse the grid pixel-by-pixel to count healthy green pixels vs. yellow/brown/black diseased pixels using custom color threshold heuristics.
  - Return a JSON response detailing leaf status ("Healthy" or "Diseased"), confidence score, coordinates outlining the main affected cluster bounding box, and specific advisory details.
- **Tabbed Diagnostics Panel**: Display the returned report inside responsive, clean tab panels:
  - *Overview*: Symptoms and leaf affected percentage.
  - *Chemical Control*: Exact recommended chemical fungicides/pesticides with dosages.
  - *Biological Control*: Organic remedies, beneficial microbes, and natural sprays.
  - *Prevention*: Farm hygiene, crop rotation, and fertilizer guidelines.

### 3. ChatGPT-Style Agronomy Chatbot Console
- **Chat Interface**: Replace simple input text forms with a scrollable bubble-log layout (differentiating User messages from Bot responses with distinct color bubbles) and a simulated active typing indicator.
- **Markdown-to-HTML Parser**: Write a custom, lightweight JavaScript parser to render rich formatting (Markdown headers, bold text, bullet points, blockquotes, and comparison tables) directly inside chat bubbles without loading large third-party Markdown libraries.
- **Chat Actions Hub**: Place click-to-trigger suggestion pills (e.g., "Fertilizer Advisory", "Integrated Pest Management", "Smart Irrigation Planning", "Soil Health & pH Management") underneath the chat bar to provide instant, structured responses from the backend.
- **Backend Query handler (/chat)**: Handle query matches for crops (Rice, Cotton, Maize, Tomato), weather guidelines, soil health, and pest management, returning clean, rich Markdown advisories.

### 4. Interactive Soil Telemetry & IoT Simulated Feed
- **Interactive Telemetry Center**: Build circular gauge cards displaying key soil metrics: Moisture (%), Temperature (°C), pH, and NPK nutrients.
- **Dynamic Gauges**: Update gauges using CSS `conic-gradient` percentages.
- **Live Stream Toggle**: Add an iOS-style slider toggle. When enabled, use a JavaScript `setInterval` function to simulate real-time telemetry updates. The script should randomly drift and fluctuate values slightly within realistic agricultural limits.
- **Actuator Device Controllers**: Add toggle action buttons to trigger physical farm mechanisms (Drip Irrigation, Greenhouse Ventilation, NPK Fertigation, Soil pH Neutralizer). Show dynamic loading states on the button, and push a floating toast notification displaying successful activation.

### 5. OpenWeatherMap Micro-Climate Integration
- **Live Weather Data**: Fetch weather values for the user's selected city via the OpenWeatherMap API in the backend.
- **Automated Agronomic Indexes**: Calculate and display:
  - *Spraying Suitability*: Evaluates wind speed (< 12 km/h) and precipitation to determine safe chemical application.
  - *Irrigation Need*: Rates demand based on heat index, rain, and humidity.
  - *Fungal Infection Risk*: Rises to CRITICAL in high humidity (> 80%).
- **Fail-Safe Fallback**: Create a high-quality simulated weather generator to populate the weather indicators dynamically in case of API offline errors, server request timeouts, or invalid keys.

### 6. Clean Git Structure & Deployment Readiness
- Ensure a proper `.gitignore` prevents logs, local environment files, cache, and uploaded media from cluttering Git commits.
- Supply a `vercel.json` and a `requirements.txt` file configured to support instant deployment on serverless environments like Vercel and Render.
```
