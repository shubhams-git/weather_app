export const WeatherCard = ({type, day,temperature, windSpeed, precipitation, pressure, tmin, tmax})=>{
    return <div className="in-line flex justify-center">
        <div className="rounded-tr-full grid grid-cols-6 bg-gradient-to-br from-bawejas-colour-500 to-w max-w-52 lg:max-w-64 lg:min-w-60 lg:mx-15 shadow-2xl">
        <div className="flex justify-center items-center col-start-2 col-span-4 lg:mt-5">
            {type=="Sunny"?
            <img className="w-20" src="sunny.png "></img>:
            type=="Rainy"?
            <img className="w-20" src="rainy.png "></img>:
            type=="Windy"?
            <img className="w-20" src="windy.png "></img>:
            <img className="w-20" src="cloudy.png "></img>
        }
        </div>
        <div className="flex justify-center col-start-2 col-span-4 sm:text-xl lg:text-2xl text-red-50 font-serif font-bold m-1">
            {day}
        </div>
        <div className="flex justify-center col-start-2 col-span-4 text-3xl lg:text-4xl text-red-50 font-serif font-extrabold mb-3">
            {temperature}°C
        </div>
        <div className="col-start-2 col-span-6 text-[8.5px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-mono text-red-50 mb-1">
            Wind Speed: {windSpeed} m/s
        </div>
        <div className="col-start-2 col-span-6 text-[8.5px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-mono text-red-50 mb-1">
            Precipitation: {precipitation} mm/h
        </div>
        <div className="col-start-2 col-span-6 text-[8.5px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-mono text-red-50 mb-1">
            Pressure: {pressure} hPa
        </div>
        <div className="col-start-2 col-span-6 text-[8.5px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-mono text-red-50 mb-1">
            Min. Temp: {tmin}°C
        </div>
        <div className="col-start-2 col-span-6 text-[8.5px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-mono text-red-50 mb-4">
            Max. Temp: {tmax}°C
        </div>
    </div>
    </div>
}