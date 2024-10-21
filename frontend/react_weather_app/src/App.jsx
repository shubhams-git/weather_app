import { AppBar } from "./assets/components/AppBar";
import { CenterCaption } from "./assets/components/CenterCaption";
import { SearchBar } from "./assets/components/SearchBar";
import { WeatherCards } from "./assets/components/weathercards";

export const App = () => {
  return (
    <div className=" z-20 relative min-h-screen w-full bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10">
        {/* This div is purely for the background */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <AppBar />
        <div className="flex justify-center mt-20">
          <CenterCaption />
        </div>
        <div className="mt-10">
          <SearchBar />
        </div>
        <div className="mt-10">
          <WeatherCards />
        </div>
      </div>
    </div>
  );
};
