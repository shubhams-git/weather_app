import { Link } from "react-router-dom";

export const MiddleBar = () => {
  return (
    <div className="flex justify-center text-white text-lg font-semibold w-1/2">
      <div className="content-center px-20">
        <Link to="/">Home</Link>
      </div>
      <div className="content-center px-20">
        <Link to="/graph">Graph</Link>
      </div>
      <div className="content-center px-20">
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};
