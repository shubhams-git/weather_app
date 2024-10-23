export const ReturnedCityText = ({ city, onBack }) => {
    return (
      <div className="flex justify-center">
        <div className="flex justify-center items-end font-serif text-white">
          <div className="text-xl">
            The Selected City is 
          </div>
          <div className="text-3xl mt-1 pl-2 pr-5 font-extrabold from-indigo-500 to-blue-500 bg-gradient-to-l bg-clip-text text-transparent">
            {city}
          </div>
        </div>
        <div className="flex items-end">
          <button 
            onClick={onBack} 
            className="text-white bg-gradient-to-r from-bawejas-colour-500 via-gray-700 to-bawejas-colour-500 hover:from-purple-800 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-700 font-medium rounded-full pl-4 pr-5 py-1 mb-0.5 text-sm inline-flex items-center transition-all duration-300 ease-in-out transform hover:scale-105"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <span className="pl-2 text-base text-white">
              Change City
            </span>
          </button> 
        </div>
      </div>
    );
  };
  