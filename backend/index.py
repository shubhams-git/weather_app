from fastapi import FastAPI, HTTPException, Query
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
    allow_origins=["https://weather-app-six-nu-51.vercel.app", "http://localhost:5173"],
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
    return generate_predictions(city.city)

@app.get("/predict")
def predict_get(city: str = Query(..., description="City name for weather prediction")):
    weather_data = fetch_weather_data(city)
    predictions = []

    # Loop through the 24 intervals (8 intervals * 3 days)
    for i in range(24):
        # Get weather data for each 3-hour interval
        interval_data = weather_data['list'][i]
        t_min = interval_data['main']['temp_min']
        t_max = interval_data['main']['temp_max']
        t_average = (t_min + t_max) / 2

        pressure = interval_data['main']['pressure']
        wind_speed = interval_data['wind']['speed']
        wind_direction = interval_data['wind']['deg']
        precipitation = interval_data.get('rain', {}).get('3h', 0)

        # Generate predictions for the current interval
        weather_input = [
            t_average,
            precipitation,
            wind_direction,
            wind_speed,
            pressure
        ]
        
        prediction1 = round(model1.predict([weather_input])[0], 1)
        prediction2 = round(model2.predict([weather_input])[0], 1)

        # Format the date and time for the current interval
        interval_time = datetime.now() + timedelta(hours=(i * 3))
        date_label = interval_time.isoformat()

        # Classify the weather for this interval
        interval_type = classify_weather_day(t_average, precipitation, wind_speed)

        # Determine day label (Today, Tomorrow, or day name)
        if interval_time.date() == datetime.now().date():
            day_label = "Today"
        elif interval_time.date() == (datetime.now() + timedelta(days=1)).date():
            day_label = "Tomorrow"
        else:
            day_label = interval_time.strftime("%A")

        predictions.append({
            "datetime": date_label,
            "day": day_label,
            "weather_data": {
                "avg_temperature": round(t_average, 1),
                "precipitation": round(precipitation, 1),
                "wind_direction": round(wind_direction, 1),
                "wind_speed": round(wind_speed, 1),
                "pressure": round(pressure, 1)
            },
            "t_max_prediction": prediction1,
            "t_min_prediction": prediction2,
            "type": interval_type
        })

    return {
        "city": city,
        "predictions": predictions
    }


def generate_predictions(city: str):
    weather_data = fetch_weather_data(city)
    predictions = []

    for i in range(3):
        # Collect data for the 8 intervals (representing one day)
        day_temps = []
        day_pressures = []
        day_wind_speeds = []
        day_wind_directions = []
        day_precipitations = []

        for j in range(8):
            day_data = weather_data['list'][i * 8 + j] 
            t_min = day_data['main']['temp_min']
            t_max = day_data['main']['temp_max']
            t_average = (t_min + t_max) / 2
            day_temps.append(t_average)

            day_pressures.append(day_data['main']['pressure'])
            day_wind_speeds.append(day_data['wind']['speed'])
            day_wind_directions.append(day_data['wind']['deg'])
            precipitation = day_data.get('rain', {}).get('3h', 0)
            day_precipitations.append(precipitation)

        # Calculate the average of each parameter over the 8 intervals
        avg_temp = round(sum(day_temps) / len(day_temps), 1)
        avg_pressure = round(sum(day_pressures) / len(day_pressures), 1)
        avg_wind_speed = round(sum(day_wind_speeds) / len(day_wind_speeds), 1)
        avg_wind_direction = round(sum(day_wind_directions) / len(day_wind_directions), 1)
        avg_precipitation = round(sum(day_precipitations) / len(day_precipitations), 1)

        # Prepare the input for predictions
        weather_input = [
            avg_temp,
            avg_precipitation,
            avg_wind_direction,
            avg_wind_speed,
            avg_pressure
        ]

        # Generate predictions
        prediction1 = round(model1.predict([weather_input])[0], 1)
        prediction2 = round(model2.predict([weather_input])[0], 1)

        # Classify the weather day
        day_type = classify_weather_day(avg_temp, avg_precipitation, avg_wind_speed)
        
        # Format the date as "dd/mm/yy"
        date_label = (datetime.now() + timedelta(hours=(i * 3))).isoformat()

        if i == 0:
            day_label = "Today"
        else:
            day_label = (datetime.now() + timedelta(days=i)).strftime("%A")

        predictions.append({
            "date": date_label,
            "day": day_label,
            "weather_data": {
                "avg_temperature": avg_temp,
                "precipitation": avg_precipitation,
                "wind_direction": avg_wind_direction,
                "wind_speed": avg_wind_speed,
                "pressure": avg_pressure
            },
            "t_max_prediction": prediction1,
            "t_min_prediction": prediction2,
            "type": day_type
        })

    return {
        "city": city,
        "predictions": predictions
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
