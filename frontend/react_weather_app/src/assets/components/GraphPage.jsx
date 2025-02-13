import { useState, useEffect } from "react";
import axios from "axios";
import { SearchBar } from "./SearchBar";
import { Loader } from "./Loader"; // Import your loader component
import PredictedTempChart from "./PredictedTempChart"; // Assuming you'll add more charts here in future
import { ReturnedCityText } from "./ReturnedCityText";
import DynamicPieChart from "./DynamicPieChart";
import DifferenceLineChart from "./DifferenceLineChart";

const GraphPage = ({ selectedCity, setSelectedCity, onBack }) => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL + `/predict?city=${selectedCity}`;
  console.log("From graph page, API: " + API_URL);

  useEffect(() => {
    if (selectedCity && predictions.length === 0) {
      fetchPredictions();
    }
  }, [selectedCity]);
  

  const fetchPredictions = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get(API_URL);
      setPredictions(response.data.predictions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // Errors from the server (e.g., 4xx or 5xx HTTP status codes)
        if (error.response.status === 404) {
          setError("City not found. Please ensure the city name is correct.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        // No response from server
        setError("Network error. Please check your internet connection.");
      } else {
        // Other errors
        setError("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="z-20 relative min-h-screen w-full bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

      {selectedCity ? (
        <div className="container mx-auto pt-5">
          {/* Display Loader while fetching */}
          {isLoading ? (
            <Loader />
          ) : error ? (
              <div className="bg-red-500 text-white p-4 rounded-md mt-4">
                <p className="font-semibold">Oops! Something went wrong:</p>
                <p>{error}</p>
              </div>
          ) : (
            <>
              <ReturnedCityText city={selectedCity} onBack={onBack}/>
              <div className="flex justify-center mb-5 mx-5"><DifferenceLineChart predictions={predictions}/></div>
              <div className="mx-5 lg:flex lg:flex-row lg:justify-evenly">
                {/* Pass all 24 points to PredictedTempChart */}
                <PredictedTempChart predictions={predictions} />

                {/* Pass only the daily aggregated data to DynamicPieChart */}
                <div className="mx-24 mt-10 lg:m-0">
                <DynamicPieChart predictions={predictions} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // If no city is selected, show the search bar
        <div className="flex justify-center mt-10">
          <SearchBar onSearch={setSelectedCity} />
        </div>
      )}
    </div>
  );
};

export default GraphPage;
