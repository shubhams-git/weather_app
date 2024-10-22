import { WeatherCard } from "./WeatherCard"



export const WeatherCards=() => {
    return <div className="flex justify-center">
            <WeatherCard city={"Melbourne"} temperature={24.2} windSpeed={12} tmin={19.3} tmax={26.5}/>
            <WeatherCard city={"Multan"} temperature={24.2} windSpeed={12} tmin={19.3} tmax={26.5}/>
            <WeatherCard city={"Ambala"} temperature={24.2} windSpeed={12} tmin={19.3} tmax={26.5}/>
        
    </div>
}