import { Link, useLocation } from "react-router-dom";

export const MiddleBar = () => {
  const location = useLocation(); // Get the current route

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex justify-center text-white text-lg md:text-xl font-semibold">
      <div className="flex sm:mx-10">
        <div className={`content-center px-6 sm:px-4 md:px-10`}>
          <Link to="/" className={isActive("/") ? "text-[#3498db] font-bold" : "text-gray hover:text-[#50b9ff] transition-all duration-3000"}>Home</Link>
        </div>
        <div className={`content-center px-6 sm:px-4 md:px-10`}>
          <Link to="/graph" className={isActive("/graph") ? "text-[#3498db] font-bold" : "text-gray-300 hover:text-[#50b9ff]  transition-all duration-3000"}>Graph</Link>
        </div>
        <div className={`content-center px-6 sm:px-4 md:px-10`}>
          <Link to="/about" className={isActive("/about") ? "text-[#3498db] font-bold" : "text-gray-300 hover:text-[#50b9ff]  transition-all duration-3000"}>About</Link>
        </div>
      </div>
    </div>
  );
};
