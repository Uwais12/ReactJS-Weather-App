import Clothing from './Clothing';
import Footer from './Footer';
import Header from './Header';
import Activities from './Activities';
import DailyForecast from './DailyForecast';

//home page
//props:
//setLat, setLong - functions to change the location
//currentCond, currentWeather, hourlyWeather, unit, dailyData - weather information
//style - styling for a html element
const Home = ({ currentCond, setLat, setLong, currentWeather, hourlyWeather, unit, style, dailyData }) => {

    return (

        < div >

            <Header currentCond={currentCond} setLat={setLat} setLong={setLong} style={style} currentWeather={currentWeather} hourlyWeather={hourlyWeather} unit={unit} />
            <DailyForecast dailyData={dailyData} unit={unit} />
        </div >
    )
}

export default Home