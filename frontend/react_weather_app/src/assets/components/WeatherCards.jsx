import { WeatherCard } from "./WeatherCard"

const predictions = [{
    "day": "Today",
    "weather_data": {
        "avg_temperature": 21.5,
        "precipitation": 23,
        "wind_speed": 12,
        "pressure": 1023
    },
    "t_max_prediction": 29.6,
    "t_min_prediction": 18.0,
    "type": "Sunny"
},
{
    "day": "Wednesday",
    "weather_data": {
        "avg_temperature": 20.5,
        "precipitation": 21,
        "wind_speed": 52,
        "pressure": 1002
    },
    "t_max_prediction": 22.6,
    "t_min_prediction": 19.0,
    "type": "Cloudy"
},
{
    "day": "Friday",
    "weather_data": {
        "avg_temperature": 41.5,
        "precipitation": 22,
        "wind_speed": 19,
        "pressure": 1015
    },
    "t_max_prediction": 45.6,
    "t_min_prediction": 38.0,
    "type": "Rainy"
}
]


export const WeatherCards=() => {
    return <div className="flex justify-center">
            {
                predictions.map((data)=>{return <WeatherCard type={data.type} day={data.day} temperature={data.weather_data.avg_temperature} windSpeed={data.weather_data.wind_speed} precipitation={data.weather_data.precipitation} pressure={data.weather_data.pressure} tmin={data.t_min_prediction} tmax={data.t_max_prediction}/>})
            }   
    </div>
}