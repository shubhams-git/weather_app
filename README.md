
# Weather Prediction and Visualization App

This is a full-stack application that predicts weather conditions for a given city over the next few days and visualizes the data through dynamic charts. The app utilizes machine learning models to forecast weather attributes, including precipitation, temperature, wind speed, and pressure, and presents a smooth, responsive user interface.

## Project Structure

### Backend
- **Language/Framework**: Python, FastAPI
- **Machine Learning Models**: Used to predict weather conditions
- **Deployment**: Render

#### File Structure:
```
backend/
├── models/
│   ├── classifier_model.pkl
│   ├── model1.pkl
│   └── model2.pkl
├── __pycache__/
├── .gitignore
├── index.py
├── Procfile
└── requirements.txt
```

### Frontend
- **Framework/Library**: React.js, Tailwind CSS, D3.js for visualizations
- **Deployment**: Vercel

#### File Structure:
```
frontend/
└── react_weather_app/
    ├── public/
    │   ├── architect.svg
    │   ├── cloudy.png
    │   ├── rainy.png
    │   ├── sunny.png
    │   ├── vite.svg
    │   └── windy.png
    ├── src/
    │   ├── assets/
    │   │   └── react.svg
    │   └── components/
    │       ├── AppBar.jsx
    │       ├── CenterCaption.jsx
    │       ├── DifferenceLineChart.jsx
    │       ├── DynamicPieChart.jsx
    │       ├── GraphPage.jsx
    │       ├── Loader.jsx
    │       ├── MiddleBar.jsx
    │       ├── PredictedTempChart.jsx
    │       ├── ReturnedCityText.jsx
    │       ├── SearchBar.jsx
    │       ├── SignInButton.jsx
    │       ├── WeatherCard.jsx
    │       └── WeatherCards.jsx
    ├── .env
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## Features

- **Weather Prediction**: Using machine learning models trained to forecast weather metrics such as temperature (max and min), precipitation, wind speed, and pressure based on OpenWeatherMap data.
- **Dynamic Visualizations**: Implements D3.js to display line charts and pie charts representing different weather attributes across multiple days.
- **Responsive UI**: Built with Tailwind CSS to ensure compatibility across devices.
- **Smooth Navigation**: The app has a user-friendly interface, allowing seamless navigation between different sections.


## Getting Started



### Prerequisites

- **Backend**: Python (version 3.7+), FastAPI, joblib for loading models
- **Frontend**: Node.js, npm or yarn
- **Environment Variables**: 
    - **API_KEY** for OpenWeatherMap API
    - **Frontend URL** (for CORS settings in FastAPI)

### Installation

### 1. Clone the Repository
To get started, clone the GitHub repository:


1. **Backend Setup**
    - Clone the repository and navigate to the `backend` directory.
      ```bash
      git clone https://github.com/shubhams-git/weather_app.git
      cd weather_app
      cd backend
      ```
    - Install the required Python packages:
      ```bash
      pip install -r requirements.txt
      ```
    - Start the FastAPI server:
      ```bash
      uvicorn index:app --reload
      ```

2. **Frontend Setup**
    - Navigate to the `frontend/react_weather_app` directory.
      ```bash
      cd frontend
      cd react_weather_app
      ```
    - Install the required npm packages:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```

### Deployment

- **Backend**: Deployed on Render.
- **Frontend**: Deployed on Vercel.

## Usage

1. **Home Page**: Enter the city name to retrieve weather predictions for the next few days.
2. **Charts**: View dynamic line and pie charts showcasing predictions of temperature, precipitation, wind speed, and pressure.
3. **Responsive UI**: The application is designed to work on both desktop and mobile devices.

## API Endpoints

- `GET /`: Root endpoint to check if the server is running.
- `POST /predict`: Expects a JSON object with a `city` field. Fetches and processes weather data for the given city.
- `GET /predict`: Provides weather predictions over a specified period for a city.

## Technologies Used

- **Backend**: FastAPI, joblib for ML model handling, and CORS middleware for secure cross-origin requests.
- **Frontend**: React.js for UI, Tailwind CSS for styling, and D3.js for data visualizations.
- **Data Source**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Deployment Platforms**: Render (Backend), Vercel (Frontend)


This README provides an overview of the project and guides you through the setup, deployment, and usage. Happy coding!