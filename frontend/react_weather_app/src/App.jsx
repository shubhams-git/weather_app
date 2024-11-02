import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppBar } from "./assets/components/AppBar";
import { CenterCaption } from "./assets/components/CenterCaption";
import { SearchBar } from "./assets/components/SearchBar";
import { WeatherCards } from "./assets/components/WeatherCards";
import { Loader } from "./assets/components/Loader";
import { ReturnedCityText } from "./assets/components/ReturnedCityText";
import { BackendStatusNotice } from "./assets/components/BackendStatusNotice"; // Import the notice component

import GraphPage from "./assets/components/GraphPage";
import axios from "axios";
import { AboutPage } from "./assets/components/AboutPage";

export const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL + "/predict";

  // Fetch weather data when selectedCity changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCity) {
        setIsSearching(true);
        try {
          const response = await axios.post(API_URL, { city: selectedCity });
          setWeatherData(response.data.predictions);
          setSearchCompleted(true);
        } catch (error) {
          console.error("Error fetching data from backend:", error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleSearch = async (searchValue) => {
    setIsSearching(true);
    setSelectedCity(searchValue);
    setSearchCompleted(false);

    try {
      const response = await axios.post(API_URL, { city: searchValue });
      setWeatherData(response.data.predictions);
      setSearchCompleted(true);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBackToSearch = () => {
    setSelectedCity("");
    setSearchCompleted(false);
    setWeatherData([]);
  };

  return (
    <Router>
      <div className="z-20 relative min-h-screen w-full bg-slate-950">
        <BackendStatusNotice /> {/* Display the backend delay notice */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
        <div className="relative flex flex-col">
          <AppBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex justify-center mt-10 lg:m-0">
                    <CenterCaption />
                  </div>
                  <div className="mt-10 lg:m-0">
                    {isSearching ? (
                      <Loader />
                    ) : (searchCompleted || selectedCity !== "") ? (
                      <ReturnedCityText
                        city={selectedCity}
                        onBack={handleBackToSearch}
                      />
                    ) : (
                      <SearchBar onSearch={handleSearch} />
                    )}
                  </div>
                  <div className="mt-10">
                    {((weatherData.length > 0 && !isSearching) || selectedCity !== "") ? (
                      <WeatherCards data={weatherData} />
                    ) : null}
                  </div>
                </>
              }
            />
            <Route
              path="/graph"
              element={
                <GraphPage
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  onBack={handleBackToSearch}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
