import { useState } from "react";
export const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if (validateCity(searchValue)) {
      onSearch(searchValue); // Call the parent function
      setError(""); // Clear previous errors
    } else {
      setError("Please enter a valid city name (alphabetical characters only).");
    }
  };

  const validateCity = (city) => {
    const cityRegex = /^[a-zA-Z\s]+$/;
    return city.trim() !== "" && cityRegex.test(city);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto font-[sans-serif]">
      <div className="flex rounded-full border-2 border-transparent focus-within:border-blue-500 overflow-hidden w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Location..."
          className="w-full outline-none bg-white text-sm px-5 py-3"
        />
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18px"
            className="fill-white"
          >
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
            ></path>
          </svg>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
