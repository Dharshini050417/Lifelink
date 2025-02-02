# LifeLink

LifeLink is an AI-powered mental wellness chatbot designed to provide emotional support and stress relief exercises. The chatbot classifies user inputs based on emotional severity and provides tailored responses.

## 🚀 Features
- AI-powered chatbot for mental wellness
- Emotion classification API
- Google Translate integration
- Voice input support
- Dark mode toggle
- PDF report generation

---

## 🛠️ Setup Instructions

### 1️⃣ Frontend Setup

#### Prerequisites:
- Node.js (v16+ recommended)

#### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/Dharshini050417/Lifelink.git
   cd Lifelink/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

The frontend will be available at `http://localhost:3000/`.

---

### 2️⃣ Backend Setup (Classification API)

#### Prerequisites:
- Python (v3.8+ recommended)
- Virtual environment

#### Steps:
1. Navigate to the backend directory:
   ```sh
   cd ../classification
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```sh
   python app.py
   ```

The API will run on `http://127.0.0.1:5000/`.

---

## 🌐 Deployed Models
The chatbot model has been deployed at the following endpoints:
1. Cloudflare Workers:
   ```
   https://floral-mode-046e.dharshinilohi.workers.dev/
   ```
2. Render:
   ```
   https://lifelink-1.onrender.com/classify
   ```

Make sure the frontend fetch requests are correctly pointed to these endpoints.

---


