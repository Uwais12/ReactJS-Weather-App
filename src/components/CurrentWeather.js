import { useEffect, useState } from "react"
import { TiWeatherCloudy, TiWeatherNight, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy } from "react-icons/ti"

//dictionary to get an icon depending on the weather
const weatherIcons = {
    "cloud": <TiWeatherCloudy />,
    "rain": <TiWeatherShower />,
    "sun": <TiWeatherSunny />,
    "overcast": <TiWeatherWindyCloudy />,
    "snow": <TiWeatherSnow />,
    "storm": <TiWeatherStormy />,
    "clear": <TiWeatherSunny />,
    "drizzle": <TiWeatherShower />
}

//component to display the current weather 
const CurrentWeather = ({ currentWeather, unitNew }) => {

    //state variables
    const [currentCond, setCurrentCond] = useState()
    const [currentIcon, setCurrentIcon] = useState()
    const [unit, setUnit] = useState(unitNew)

    //when the unit of temperature changes, update the state variable
    useEffect(() => {
        setUnit(unitNew)
    }, [unitNew])

    //when the currentWeather changes update the current condition state variable
    useEffect(() => {
        setCurrentCond(currentWeather[1])

    }, [currentWeather])

    //When the condition of the weather changes, set the CurrentIcon state variable
    useEffect(() => {

        if (typeof currentCond === "string") {
            Object.entries(weatherIcons).map(([key, val]) => {
                if (currentCond.toLowerCase().includes(key)) {
                    setCurrentIcon(val)
                }
            })
        }

    }, [currentCond])


    return (

        <div className='currentWeather'>

            <div>
                <div className="currWeather">
                    <h1>{currentWeather[0]} </h1>
                    <p>{unit}</p>
                </div>
            </div>
            <div>
                <h3>{currentWeather[2]}</h3>
            </div>
            <div>
                {currentCond}
            </div>
        </div >
    )
}
export default CurrentWeather