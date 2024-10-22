export const WeatherCard = ({city,temperature, windSpeed, tmin, tmax})=>{
    return <div className="size-2/12 rounded-2xl grid grid-cols-6 bg-gradient-to-br from-bawejas-colour-500 to-w ml-20 mr-20 pb-12 shadow-2xl">
        <div className="flex  justify-center items-center col-start-2 col-span-4 mt-5 mb-5">
            <img className="max-w-20 h-fit" src="sunny.png "></img>
        </div>
        <div className="col-start-2 col-end-4 text-3xl text-red-50 font-bold mb-5">
            {city}
        </div>
        <div className="col-end-7 col-span-2 text-3xl text-red-50 mb-2">
            {temperature}°C
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Wind Speed: {windSpeed} Km
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Tuesday (22/10/2024)
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Min. Temp: {tmin}°C
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Max. Temp: {tmax}°C
        </div>
    </div>
}