import { useState, useEffect } from 'react'
import { TiWeatherCloudy, TiWeatherNight, TiWeatherPartlySunny, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy } from "react-icons/ti"


const weatherIcons = {
    "cloud": <TiWeatherCloudy />,
    "rain": <TiWeatherShower />,
    "sun": <TiWeatherSunny />,
    "overcast": <TiWeatherWindyCloudy />,
    "snow": <TiWeatherSnow />,
    "storm": <TiWeatherStormy />,
    "clear": <TiWeatherPartlySunny />,
    "drizzle": <TiWeatherShower />,
    "fog": <TiWeatherCloudy />

}

//function to return an icon depending on the current condition
const getIcon = currentCond => {
    return Object.entries(weatherIcons).map(([key, val]) => {
        if (currentCond.toLowerCase().includes(key)) {
            return (<div key={key}> {val}</div >)
        }
    })
}

//display hourlyweather component
//props:
//currentCond, hourlyWeather - weather information
// unitNew- unit of temperature
const HourlyWeather = ({ currentCond, hourlyWeather, unitNew }) => {

    //state variables
    const [unit, setUnit] = useState("℃")
    const [classNamee, setClassNamee] = useState("hourlyWeather2 sun")

    //when the user changes the unit, set the unit state variable to the new one
    useEffect(() => {
        setUnit(unitNew)

    }, [unitNew])


    //change the styling of an html element when the currentCond variable changes
    useEffect(() => {

        if (typeof currentCond === "string") {

            if (currentCond.includes("rain") | hourlyWeather[0].condition.text.includes("drizzle")) {

                setClassNamee('hourlyWeather2 rain')
            }
            else {

                setClassNamee('hourlyWeather2 sun')
            }
        }

    }, [currentCond, hourlyWeather])

    return (

        <div className={classNamee} >
            {/* Map the hourly weather */}
            {hourlyWeather.map((weather) => (
                <div key={weather.time_epoch} className='hourInfo'>
                    <div>
                        <div className='wImage' val={weather.condition.text}>
                            {getIcon(weather.condition.text)}
                        </div>

                        <div className='temp'>

                            {unit === "℃" ? weather.temp_c : weather.temp_f} {unit}
                        </div>
                    </div>
                    <div className='time'>
                        {weather.time.slice(-5)}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default HourlyWeather