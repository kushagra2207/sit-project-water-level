#include <WiFi.h>
#include <HTTPClient.h>
#include "config.h"

#define TRIG 5
#define ECHO 18

#define LED_OVERFLOW 25
#define LED_UNDERFLOW 26
#define LED_SERVER   27

const float TANK_HEIGHT = 200.0;   // cm
const float MAX_LITRES  = 2000.0;  // litres

// Thresholds
const float OVERFLOW_THRESHOLD = 195.0; // cm
const float UNDERFLOW_THRESHOLD = 10.0; // cm
// ==========================================

long duration;
float distance;

// -------- WiFi --------
void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

// -------- Sensor --------
float getDistance() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH, 30000);

  if (duration == 0) return -1;

  return duration * 0.034 / 2;
}

// -------- API --------
bool sendData(float litres, float percent) {
  if (WiFi.status() != WL_CONNECTED) return false;

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"litres\":" + String(litres, 2) + ",";
  payload += "\"percentage\":" + String(percent, 2);
  payload += "}";

  int code = http.POST(payload);

  http.end();

  return (code > 0 && code < 400);
}

// -------- Setup --------
void setup() {
  Serial.begin(115200);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  pinMode(LED_OVERFLOW, OUTPUT);
  pinMode(LED_UNDERFLOW, OUTPUT);
  pinMode(LED_SERVER, OUTPUT);

  connectWiFi();
}

// -------- Loop --------
void loop() {
  float d = getDistance();

  if (d < 0) {
    delay(2000);
    return;
  }

  float level = TANK_HEIGHT - d;

  if (level < 0) level = 0;
  if (level > TANK_HEIGHT) level = TANK_HEIGHT;

  float percent = (level / TANK_HEIGHT) * 100.0;
  float litres = (level / TANK_HEIGHT) * MAX_LITRES;

  // -------- LED Logic --------

  // Overflow
  digitalWrite(LED_OVERFLOW, level >= OVERFLOW_THRESHOLD);

  // Underflow
  digitalWrite(LED_UNDERFLOW, level <= UNDERFLOW_THRESHOLD);

  // Server status
  bool success = sendData(litres, percent);
  digitalWrite(LED_SERVER, success);

  // Debug
  Serial.print("Distance: "); Serial.print(d);
  Serial.print(" | Level: "); Serial.print(level);
  Serial.print(" | %: "); Serial.print(percent);
  Serial.print(" | Litres: "); Serial.println(litres);

  delay(5000);
}