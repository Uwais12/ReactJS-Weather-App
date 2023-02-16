import CurrentWeather from "./CurrentWeather"
import HourlyWeather from "./HourlyWeather"
// import PropTypes from 'prop-types'
import { useEffect } from "react"
import Search from "./Search"

//header component
//props:
//setLat, setLong - functions to change the location
//currentCond, current weather,hourlyWeather, weatherIcons, unit - information about the weather
//style - styling for a html element
const Header = ({ setLat, setLong, currentCond, style, currentWeather, hourlyWeather, weatherIcons, unit }) => {
    return (
        <div>
            <Search currentCond={currentCond} setLat={setLat} setLong={setLong} />
            <div className={style}>
                <CurrentWeather style={style} currentWeather={currentWeather} weatherIcons={weatherIcons} unitNew={unit} />
                <HourlyWeather currentCond={currentCond} hourlyWeather={hourlyWeather} weatherIcons={weatherIcons} unitNew={unit} />
            </div>
        </div>
    )
}

export default Header