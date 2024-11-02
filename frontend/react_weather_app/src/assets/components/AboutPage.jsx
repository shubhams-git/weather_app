import { D3Logo } from "./D3Logo";
import { FastApiLogo } from "./FastApiLogo";
import { OpenWeatherMapLogo } from "./OpenWeatherMapLogo";
import { PythonLogo } from "./PythonLogo";
import { ReactLogo } from "./ReactLogo";
import { ViteLogo } from "./ViteLogo";
import { TailwindLogo } from "./TailwindLogo";

export const AboutPage = () => {
  return (
    <div className="pt-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 text-gray-300 font-playwrite max-w-7xl mx-auto">
      <div className="flex justify-center text-xl sm:text-2xl lg:text-3xl font-medium mb-10 text-center">
        Here’s Our 
        <span className="font-extrabold from-sky-200 via-cyan-400 to-blue-300 bg-gradient-to-l bg-clip-text text-transparent px-2">
          Tech-Stack!
        </span>
      </div>

      <CategorySection title="Frontend" titleColor="text-cyan-400">
        <TechCard logo={<ReactLogo />} name="React" nameColor="text-blue-400" description="A JavaScript library for building user interfaces" />
        <TechCard logo={<D3Logo />} name="D3.js" nameColor="text-orange-500" description="A JavaScript library for interactive data visualizations" />
        <TechCard logo={<TailwindLogo />} name="Tailwind CSS" nameColor="text-blue-500" description="A utility-first CSS framework for styling" />
      </CategorySection>

      <CategorySection title="Backend" titleColor="text-green-400">
        <TechCard logo={<FastApiLogo />} name="FastAPI" nameColor="text-green-500" description="A fast, modern web framework for building APIs with Python" />
        <TechCard logo={<PythonLogo />} name="Python" nameColor="text-yellow-500" description="A powerful programming language for backend development" />
      </CategorySection>

      <CategorySection title="Utilities" titleColor="text-purple-400">
        <TechCard logo={<OpenWeatherMapLogo />} name="OpenWeatherMap" nameColor="text-orange-400" description="A reliable source for real-time weather data" />
        <TechCard logo={<ViteLogo />} name="Vite" nameColor="text-purple-500" description="A fast and modern build tool for frontend development" />
      </CategorySection>
    </div>
  );
};

const CategorySection = ({ title, titleColor, children }) => {
  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-semibold font-serif text-center mb-8 ${titleColor} border-b-2 border-t-2 border-gray-600 pt-2 pb-2`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  );
};

const TechCard = ({ logo, name, nameColor, description }) => {
  return (
    <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
      <div className="mb-4">{logo}</div>
      <h3 className={`text-xl font-semibold ${nameColor}`}>{name}</h3>
      <p className="text-sm mt-2 max-w-xs text-gray-400">{description}</p>
    </div>
  );
};
