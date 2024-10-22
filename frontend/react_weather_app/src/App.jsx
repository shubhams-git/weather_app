import { useState } from "react";
import { AppBar } from "./assets/components/AppBar";
import { CenterCaption } from "./assets/components/CenterCaption";
import { SearchBar } from "./assets/components/SearchBar";
import { WeatherCards } from "./assets/components/WeatherCards";
import { Loader } from "./assets/components/Loader";
import { ReturnedCityText } from "./assets/components/ReturnedCityText"; // New component
import axios from "axios";

export const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // To track the selected city
  const [searchCompleted, setSearchCompleted] = useState(false); // To track if search is complete
  const API_URL = import.meta.env.VITE_API_URL + "/predict";

  const handleSearch = async (searchValue) => {
    setIsSearching(true);
    setSelectedCity(searchValue); // Track the city being searched
    setSearchCompleted(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay for demo

      // Make the POST request to the backend
      const response = await axios.post(API_URL, {
        city: searchValue, // Send the city from the search bar
      });

      // Assuming the backend sends a list of predictions as a response
      setWeatherData(response.data.predictions); // Set the weather data state with the response
      setSearchCompleted(true); // Mark search as completed
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setIsSearching(false); // Hide loader when the search is complete
    }
  };

  const handleBackToSearch = () => {
    setSearchCompleted(false); // Reset the state to show the search bar again
    setWeatherData([]); // Clear weather data if needed
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
        <div className="flex justify-center mt-10">
          <CenterCaption />
        </div>
        <div className="mt-10">
          {/* Conditionally render Loader, SearchBar or ReturnedCityText */}
          {isSearching ? (
            <Loader />
          ) : searchCompleted ? (
            <ReturnedCityText city={selectedCity} onBack={handleBackToSearch} />
          ) : (
            <SearchBar onSearch={handleSearch} />
          )}
        </div>
        <div className="mt-10">
          {/* Render WeatherCards if weatherData is available */}
          {weatherData.length > 0 && !isSearching ? <WeatherCards data={weatherData} /> : null}
        </div>
      </div>
    </div>
  );
};
