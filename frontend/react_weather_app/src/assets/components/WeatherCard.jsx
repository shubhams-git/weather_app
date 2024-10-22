export const WeatherCard = ({type, day,temperature, windSpeed, precipitation, pressure, tmin, tmax})=>{
    return <div className="size-2/12 rounded-tr-full grid grid-cols-6 bg-gradient-to-br from-bawejas-colour-500 to-w ml-20 mr-20  shadow-2xl">
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
        <div className="flex justify-center col-start-2 col-span-4 text-5xl text-red-50 font-serif font-extrabold mb-5">
            {temperature}°C
        </div>
        <div className="col-start-2 col-span-4 text-xl font-serif text-red-50 mb-2">
            Wind Speed: {windSpeed} m/s
        </div>
        <div className="col-start-2 col-span-4 text-xl font-serif text-red-50 mb-2">
            Precipitation: {precipitation} mm/h
        </div>
        <div className="col-start-2 col-span-4 text-xl font-serif text-red-50 mb-2">
            Pressure: {pressure} hPa
        </div>
        <div className="col-start-2 col-span-4 text-xl font-serif text-red-50 mb-2">
            Min. Temp: {tmin}°C
        </div>
        <div className="col-start-2 col-span-4 text-xl font-serif text-red-50 mb-2">
            Max. Temp: {tmax}°C
        </div>
    </div>
}