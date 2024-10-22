import { useState } from "react";
import { AppBar } from "./assets/components/AppBar";
import { CenterCaption } from "./assets/components/CenterCaption";
import { SearchBar } from "./assets/components/SearchBar";
import { WeatherCards } from "./assets/components/weathercards";
import { Loader } from "./assets/components/Loader";
import axios from "axios";

export const App = () => {
  const [isSearching, setIsSearching] = useState(false); 

  const handleSearch = async (searchValue) => {
    setIsSearching(true); 

    try {
      const prom = new Promise((resolve,reject)=>{setTimeout(resolve, 5000)})
      await prom
    } catch (error) {
      console.error("Error searching:", error); 
    } finally {
      setIsSearching(false); // Hide loader when the search is complete
    }
  };

  return (
    <div className=" z-20 relative min-h-screen w-full bg-slate-950">
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
          {isSearching ? null : <WeatherCards/>}
        </div>
      </div>
    </div>
  );
};
