from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import uvicorn
import requests
import os
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model1 = joblib.load('./models/model1.pkl')
model2 = joblib.load('./models/model2.pkl')

API_KEY = os.getenv("API_KEY", "9802676f0284938fbb47ec64c489d768")

class CityName(BaseModel):
    city: str

def fetch_weather_data(city: str):
    FORECAST_API_URL = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(FORECAST_API_URL)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found or invalid API request")

    return response.json()

def classify_weather_day(temp_avg, precipitation, wind_speed):
    if precipitation > 2:
        return "Rainy"
    elif wind_speed > 10:
        return "Windy"
    elif temp_avg > 25 and precipitation == 0:
        return "Sunny"
    else:
        return "Cloudy"

@app.get("/")
def root():
    return {"message": "ML Models API using OpenWeatherMap data is running"}

@app.post("/predict")
def predict(city: CityName):
    print(API_KEY)
    weather_data = fetch_weather_data(city.city)
    predictions = []

    for i in range(3):
        day_data = weather_data['list'][i * 8]
        t_min = day_data['main']['temp_min']
        t_max = day_data['main']['temp_max']
        t_average = (t_min + t_max) / 2
        temperature = round(t_average, 1)
        pressure = round(day_data['main']['pressure'], 1)
        wind_speed = round(day_data['wind']['speed'], 1)
        wind_direction = round(day_data['wind']['deg'], 1)
        precipitation = round(day_data.get('rain', {}).get('3h', 0), 1)

        weather_input = [
            temperature,
            precipitation,
            wind_direction,
            wind_speed,
            pressure
        ]

        prediction1 = round(model1.predict([weather_input])[0], 1)
        prediction2 = round(model2.predict([weather_input])[0], 1)

        # Classify the weather day
        day_type = classify_weather_day(temperature, precipitation, wind_speed)

        if i == 0:
            day_label = "Today"
        else:
            day_label = (datetime.now() + timedelta(days=i)).strftime("%A")

        predictions.append({
            "day": day_label,
            "weather_data": {
                "avg_temperature": temperature,
                "precipitation": precipitation,
                "wind_direction": wind_direction,
                "wind_speed": wind_speed,
                "pressure": pressure
            },
            "t_max_prediction": prediction1,
            "t_min_prediction": prediction2,
            "type": day_type
        })

    return {
        "city": city.city,
        "predictions": predictions
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 