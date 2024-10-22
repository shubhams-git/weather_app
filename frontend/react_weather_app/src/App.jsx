import { useState } from "react";
import { AppBar } from "./assets/components/AppBar";
import { CenterCaption } from "./assets/components/CenterCaption";
import { SearchBar } from "./assets/components/SearchBar";
import { WeatherCards } from "./assets/components/weathercards";
import { Loader } from "./assets/components/Loader";
import axios from "axios";

export const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [weatherData, setWeatherData] = useState([{
    "day": "Today",
    "weather_data": {
        "avg_temperature": 21.5,
        "precipitation": 23,
        "wind_speed": 12,
        "pressure": 1023
    },
    "t_max_prediction": 29.6,
    "t_min_prediction": 18.0,
    "type": "Sunny"
},
{
    "day": "Wednesday   ",
    "weather_data": {
        "avg_temperature": 20.5,
        "precipitation": 21,
        "wind_speed": 52,
        "pressure": 1002
    },
    "t_max_prediction": 22.6,
    "t_min_prediction": 19.0,
    "type": "Cloudy"
},
{
    "day": "Friday",
    "weather_data": {
        "avg_temperature": 41.5,
        "precipitation": 22,
        "wind_speed": 19,
        "pressure": 1015
    },
    "t_max_prediction": 45.6,
    "t_min_prediction": 38.0,
    "type": "Rainy"
}
]); // To store backend response

  const handleSearch = async (searchValue) => {
    setIsSearching(true); 

    try {
      await new Promise((resolve)=>{return setTimeout(resolve,2000)})
      // Make the POST request to the backend
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        city: searchValue, // Send the city from the search bar
      });

      // Assuming the backend sends a list of predictions as a response
      setWeatherData(response.data.predictions); // Set the weather data state with the response
      console.log(`response.data: ${response.data.predictions[0].day}`)
    } catch (error) {
      console.error("Error fetching data from backend:", error); 
    } finally {
      setIsSearching(false); // Hide loader when the search is complete
    }
  };

  return (
    <div className="z-20 relative min-h-screen w-full bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10">
        {/* Background Div */}
      </div>
      {/* Foreground content */}
      <div>
        <AppBar />
        <div className="flex justify-center mt-20">
          <CenterCaption />
        </div>
        <div className="mt-10">
          {/* Conditionally render SearchBar or Loader */}
          {isSearching ? <Loader /> : <SearchBar onSearch={handleSearch} />}
        </div>
        <div className="mt-10">
          {/* Render WeatherCards if weatherData is available */}
          {weatherData.length > 0 && !isSearching ? <WeatherCards data={weatherData} /> : null}
        </div>
      </div>
    </div>
  );
};
