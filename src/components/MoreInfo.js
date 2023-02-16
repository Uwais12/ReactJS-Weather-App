import Clothing from './Clothing';
import Footer from './Footer';
import Header from './Header';
import Activities from './Activities';
import DailyForecast from './DailyForecast';

//moreInfo page
//props - weather information to pass to other components
const MoreInfo = ({ lat, long, setLat, setLong, currentWeather, hourlyWeather, unit, weatherNow, foodActivities, touristActivities, style, currentCond }) => {
    return (
        <div>
            {/* call other components and pass the props */}
            <Header setLat={setLat} setLong={setLong} style={style} currentWeather={currentWeather} hourlyWeather={hourlyWeather} unit={unit} currentCond={currentCond} />
            <Clothing hourlyWeather={hourlyWeather} weatherNow={weatherNow} />
            <Activities lat={lat} long={long} foodActivities={foodActivities} touristActivities={touristActivities} />
        </div>
    )
}

export default MoreInfo