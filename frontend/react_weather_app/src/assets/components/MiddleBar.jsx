import { Link, useLocation } from "react-router-dom";

export const MiddleBar = () => {
  const location = useLocation(); // Get the current route

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex justify-center text-white text-lg font-semibold w-1/2">
      <div className={`content-center px-20`}>
        <Link to="/" className={isActive("/") ? "text-[#3498db] font-bold" : "text-gray hover:text-[#50b9ff] transition-all duration-3000"}>Home</Link>
      </div>
      <div className={`content-center px-20`}>
        <Link to="/graph" className={isActive("/graph") ? "text-[#3498db] font-bold" : "text-gray-300 hover:text-[#50b9ff]  transition-all duration-3000"}>Graph</Link>
      </div>
      <div className={`content-center px-20`}>
        <Link to="/about" className={isActive("/about") ? "text-[#3498db] font-bold" : "text-gray-300 hover:text-[#50b9ff]  transition-all duration-3000"}>About</Link>
      </div>
    </div>
  );
};
