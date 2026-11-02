# SIT Water Level Monitor

A smart IoT water-level monitoring system with pipe-burst detection. It measures water levels using an ultrasonic sensor, sends the data to a Node.js backend, and displays real-time readings on a React dashboard.

---

## Project Overview

The project is divided into three simple parts:

### 1. Microcontroller (`microcontroller/`)
- Runs on an **ESP32** connected to an **HC-SR04 ultrasonic sensor**.
- Measures distance to calculate water height, percentage, and litres (calibrated for a 200 cm / 2000 L tank).
- Has 3 status LEDs:
  - **Red LED** (GPIO 25): Overflow alert ($\ge$ 195 cm)
  - **Blue LED** (GPIO 26): Low water alert ($\le$ 10 cm)
  - **Green LED** (GPIO 27): Server status (lights up when data sends successfully)
- Sends readings to the backend every 5 seconds over WiFi.
- Includes a ready-to-run **Wokwi simulation** (`diagram.json`).

### 2. Backend (`backend/`)
- Built with **Node.js & Express**.
- Ingests readings from the ESP32 and stores them in **MongoDB**.
- Provides JWT-based login for the dashboard.
- *Note:* The login works even if MongoDB is not connected; MongoDB is only needed to save and fetch water-level history.

### 3. Frontend (`frontend/`)
- Built with **React & Vite**.
- **Login screen**: Authenticates with backend admin credentials.
- **Controller selection**: Allows choosing between multiple reporting controllers/tanks.
- **Live dashboard**: Displays a visual water gauge, current litres, percentage, and status (Safe, Attention, Critical).
- **Pipe-burst detection**: Flags sudden drops ($\ge$ 30%) between readings with a warning banner and table highlights.
- **History table**: Shows timestamped previous readings.

---

## How to Set It Up

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```env
PORT=5000
JWT_SECRET=mysecretkey123
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
MONGODB_URI=mongodb://127.0.0.1:27017/sit_water_level
```

Run the backend:
```bash
npm run dev
```
Server will start on `http://localhost:5000`.

---

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

**Default Login:**
- Username: `admin`
- Password: `admin123`

---

### 3. Microcontroller Setup

Create `microcontroller/config.h` (copy from `config.example.h`):
```cpp
#ifndef CONFIG_H
#define CONFIG_H

const char* WIFI_SSID = "Wokwi-GUEST"; // or your WiFi name
const char* WIFI_PASSWORD = "";        // your WiFi password
const char* SERVER_URL = "http://<YOUR_BACKEND_IP>:5000/api/water-level";

#endif
```

- **In Wokwi (Simulation)**: Open `microcontroller/diagram.json` in VS Code with the Wokwi extension (or on [wokwi.com](https://wokwi.com)) and click Play.
- **On Physical Hardware**: Connect the ESP32, wire the sensor (`TRIG` to GPIO 5, `ECHO` to GPIO 18) and LEDs (GPIO 25, 26, 27 with 220Ω resistors), then flash `main.cpp` via Arduino IDE or PlatformIO.

---

## Quick Test Without Hardware

You can test the dashboard by sending a dummy reading using PowerShell or cURL:

```bash
curl -X POST http://localhost:5000/api/water-level \
  -H "Content-Type: application/json" \
  -d "{\"controller_id\": \"ESP32_TANK_1\", \"water_level\": 1500, \"percentage\": 75}"
```

Then log in to the frontend, select `ESP32_TANK_1`, and your reading will appear!
