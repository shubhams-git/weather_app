import { WeatherCard } from "./WeatherCard"

export const WeatherCards=( {data}) => {
    return <div className="flex justify-center">
            {
                data.map((obj)=>{return <WeatherCard type={obj.type} day={obj.day} temperature={obj.weather_data.avg_temperature} windSpeed={obj.weather_data.wind_speed} precipitation={obj.weather_data.precipitation} pressure={obj.weather_data.pressure} tmin={obj.t_min_prediction} tmax={obj.t_max_prediction}/>})
            }   
    </div>
}