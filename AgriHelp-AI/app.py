from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = "fec66e2a1320d76e9832ebc9fa3adde1"


def get_farmer_response(query):
    query = query.lower().strip()

    if "rice" in query or "paddy" in query:
        return "Rice Advisory: Maintain 2–5 cm water level, use urea in split doses, and monitor for leaf blast disease."

    if "cotton" in query:
        return "Cotton Advisory: Avoid over-irrigation, use balanced NPK fertilizer, and monitor for bollworm and whitefly."

    if "maize" in query:
        return "Maize Advisory: Use NPK fertilizer, irrigate every 7–10 days, and protect from stem borer."

    if "tomato" in query:
        return "Tomato Advisory: Maintain soil moisture and monitor for leaf curl, blight, and fruit borer."

    if "fertilizer" in query:
        return "Fertilizer Advisory: Use NPK for balanced crop growth and organic compost for long-term soil health."

    if "pest" in query or "disease" in query:
        return "Disease Advisory: Check leaf spots, curling, drying, and discoloration. Use the AI Scan section for visual crop checking."

    if "water" in query or "irrigation" in query:
        return "Irrigation Advisory: Avoid over-watering. Irrigate based on crop stage, soil moisture, and weather condition."

    if "soil" in query or "ph" in query:
        return "Soil Advisory: Maintain pH around 6.0–7.5 and improve fertility using organic matter."

    if "weather" in query or "rain" in query:
        return "Weather Advisory: Check live weather before irrigation or pesticide spraying."

    return "AgriSight AI can help with crop disease, fertilizer, soil, irrigation, pest control, and weather-based farming advice."


def get_weather(city):
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        data = requests.get(url, timeout=5).json()

        if data.get("cod") != 200:
            return None

        temp = data["main"]["temp"]
        humidity = data["main"]["humidity"]
        wind = data["wind"]["speed"]
        condition = data["weather"][0]["main"]

        if humidity > 80:
            advice = "High humidity detected. Monitor fungal disease risk."
        elif temp > 35:
            advice = "High temperature detected. Monitor soil moisture carefully."
        elif condition.lower() in ["rain", "drizzle", "thunderstorm"]:
            advice = "Rain detected. Delay irrigation and avoid pesticide spraying."
        else:
            advice = "Weather looks suitable for regular crop monitoring."

        return {
            "city": city.title(),
            "temperature": temp,
            "humidity": humidity,
            "wind": wind,
            "condition": condition,
            "advice": advice
        }

    except Exception:
        return None


@app.route("/", methods=["GET", "POST"])
def home():
    response = ""
    query = ""
    city = "Vijayawada"

    if request.method == "POST":
        query = request.form.get("query", "")
        city = request.form.get("city", "Vijayawada")

        if query:
            response = get_farmer_response(query)

    weather = get_weather(city)

    return render_template(
        "index.html",
        response=response,
        query=query,
        city=city,
        weather=weather
    )


if __name__ == "__main__":
    app.run(debug=True)