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
            <button onClick={onBack} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 pl-2 pr-3 mb-1.5 text-sm inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
                <div className=" flex items-end text-base text-white pl-2 text-opacity-75">
                    Change City
                </div>
            </button> 
        </div>       
      </div>
    );
  };
  