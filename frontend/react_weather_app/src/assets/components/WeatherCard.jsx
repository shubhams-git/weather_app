export const WeatherCard = ()=>{
    return <div className="rounded-2xl grid grid-cols-6 bg-gradient-to-br from-bawejas-colour-500 to-w ml-20 mr-20 pb-20 shadow-2xl">
        <div className="flex  justify-center items-center col-start-2 col-span-4 mt-5 mb-5">
            <img className="max-w-20 h-fit" src="sunny.png "></img>
        </div>
        <div className="col-start-2 col-end-4 text-3xl text-red-50 font-bold mb-5">
            Tehran
        </div>
        <div className="col-end-7 col-span-2 text-3xl text-red-50 mb-2">
            35°C
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Wind Speed: 11 Km
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Tuesday (22/10/2024)
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Min. Temp: 15°C
        </div>
        <div className="col-start-2 col-span-4 text-xl text-red-50 mb-2">
            Max. Temp: 40°C
        </div>
    </div>
}