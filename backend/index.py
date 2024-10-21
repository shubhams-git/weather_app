from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import requests

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load models from .pkl files using joblib
model1 = joblib.load('./models/model1.pkl')
model2 = joblib.load('./models/model2.pkl')

# OpenWeatherMap API setup
API_KEY = "9802676f0284938fbb47ec64c489d768"

# Pydantic model for request body
class CityName(BaseModel):
    city: str

# Helper function to fetch weather for the next 5 days (forecast data) for a given city
def fetch_weather_data(city: str):
    FORECAST_API_URL = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(FORECAST_API_URL)

    # Check if the response is successful
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found or invalid API request")

    return response.json()

# Root endpoint to check the API is running
@app.get("/")
def root():
    return {"message": "ML Models API using OpenWeatherMap data is running"}

# Endpoint to get predictions for 5 days using 5-day forecast data
@app.post("/predict")
def predict(city: CityName):
    # Fetch the forecast weather data for the given city
    weather_data = fetch_weather_data(city.city)

    # We will store predictions for 5 intervals (each for roughly 1 day apart)
    predictions = []
    weather_inputs = []

    # Extract data from the forecast (every 8th entry corresponds to ~24 hours apart)
    for i in range(5):
        day_data = weather_data['list'][i * 8]  # Get the ith day's weather data (every 24 hours)
        t_min = day_data['main']['temp_min']
        t_max = day_data['main']['temp_max']
        t_average = (t_min + t_max) / 2
        temperature = round(t_average, 2)  # Temperature (Celsius)
        pressure = round(day_data['main']['pressure'], 2)  # Pressure (hPa)
        wind_speed = round(day_data['wind']['speed'], 2)  # Wind speed (m/s)
        wind_direction = round(day_data['wind']['deg'], 2)  # Wind direction (degrees)
        precipitation = round(day_data.get('rain', {}).get('3h', 0), 2)  # Precipitation (mm in the last 3 hours)

        # Prepare the weather input data
        weather_input = [
            temperature,    # input1 - T average of the day
            precipitation,  # input2 - Precipitation
            wind_direction, # input3 - Wind direction
            wind_speed,     # input4 - Wind Speed
            pressure        # input5 - Pressure
        ]

        # Get predictions from both models and round them to 2 decimal places
        prediction1 = round(model1.predict([weather_input])[0], 2)
        prediction2 = round(model2.predict([weather_input])[0], 2)

        # Store the weather input and predictions for this day
        weather_inputs.append(weather_input)
        predictions.append({
            "Day": i - 2, 
            "Weather Data": {
                "Temperature (Average)": temperature,
                "Precipitation": precipitation,
                "Wind Direction": wind_direction,
                "Wind Speed": wind_speed,
                "Pressure": pressure
            },
            "Temp Max Prediction": prediction1,
            "Temp Min Prediction": prediction2
        })

    # Return the predictions for all 5 days
    return {
        "City": city.city,
        "Predictions": predictions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
