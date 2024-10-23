export const WeatherCard = ({type, day,temperature, windSpeed, precipitation, pressure, tmin, tmax})=>{
    return <div className="h-fit rounded-tr-full grid grid-cols-6 bg-gradient-to-br from-bawejas-colour-500 to-w mt-5    ml-20 mr-20  shadow-2xl">
        <div className="flex  justify-center items-center col-start-2 col-span-4 mt-5 mb-5">
            {type=="Sunny"?
            <img className="max-w-20 h-fit" src="sunny.png "></img>:
            type=="Rainy"?
            <img className="max-w-20 h-fit" src="rainy.png "></img>:
            type=="Windy"?
            <img className="max-w-20 h-fit" src="windy.png "></img>:
            <img className="max-w-20 h-fit" src="cloudy.png "></img>
        }
        </div>
        <div className="flex justify-center col-start-2 col-span-4 text-2xl text-red-50 font-serif font-bold mb-1">
            {day}
        </div>
        <div className="flex justify-center col-start-2 col-span-4 text-4xl text-red-50 font-serif font-extrabold mb-3">
            {temperature}°C
        </div>
        <div className="col-start-2 col-span-4 text-base font-mono text-red-50 mb-1">
            Wind Speed: {windSpeed} m/s
        </div>
        <div className="col-start-2 col-span-4 text-base font-mono text-red-50 mb-1">
            Precipitation: {precipitation} mm/h
        </div>
        <div className="col-start-2 col-span-4 text-base font-mono text-red-50 mb-1">
            Pressure: {pressure} hPa
        </div>
        <div className="col-start-2 col-span-4 text-base font-mono text-red-50 mb-1">
            Min. Temp: {tmin}°C
        </div>
        <div className="col-start-2 col-span-4 text-base font-mono text-red-50 mb-2">
            Max. Temp: {tmax}°C
        </div>
    </div>
}