//Imports:
import './App.css';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MoreInfo from './components/MoreInfo';
import News from './components/News';



function App() {

  //setting state variables
  const [weather, setWeather] = useState([])
  const [currentWeather, setcurrentWeather] = useState([])
  const [hourlyWeather, sethourlyWeather] = useState([])
  const [weatherNow, setweatherNow] = useState([])
  const [lat, setLat] = useState(51)
  const [long, setLong] = useState(0.12)
  const [foodActivities, setFoodActivities] = useState([])
  const [touristActivities, setTouristActivities] = useState([])
  const [unit, setUnit] = useState("℃")
  const [dailyData, setDailyData] = useState([])
  const [currentCond, setCurrentCond] = useState([])
  const [country, setCountry] = useState("gb")

  //if the user has a location stored in local storage, get that location and set it to the state variables
  useEffect(() => {
    if (localStorage.getItem("lat")) {
      setLat(localStorage.getItem("lat"))
      setLong(localStorage.getItem("long"))
    }

  }, [])



  //when lat, long and unit change, set the values in the local storage
  useEffect(() => {

    localStorage.setItem("lat", lat)
    localStorage.setItem("long", long)
    localStorage.setItem("unit", unit)
    fetchWeather(lat, long, unit)
    fetchActivities(lat, long)

  }, [lat, long, unit])

  //function to fetch the weather from the api 
  const fetchWeather = async (lat1, long1, unitType) => {

    const apiKey = "45ffea8100064f028b9133756220103";
    var inputVal = `${lat1},${long1}`
    const dailyApiKey = "2b49036a3236c92ef3bfa333925e4ce3"
    if (unitType === "℃") {
      var units = "metric"
    }
    else {
      var units = "imperial"
    }


    const dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${long1}&exclude=hourly,current,minutely&units=${units}&appid=${dailyApiKey}`;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputVal}&days=150&aqi=no&alerts=no&max_distance=50`;

    //set the daily weather
    var dailyData = []

    const dRes = fetch(dailyUrl).then((dRes) => {
      const dData = dRes.json().then((dData) => {
        dData = dData.daily
        for (let i = 0; i < 8; i++) {
          dailyData.push(dData[i])
        }

        setDailyData(dailyData)
      })
    });

    //set other weather
    const res = fetch(url).then((res) => {
      const data = res.json().then((data) => {
        const current = new Date();
        const hour = current.getHours();
        const numHours = 12

        var wHours = data.forecast.forecastday[0].hour.slice(hour)

        if (wHours.length < numHours) {
          for (let i = 0; i < numHours - wHours.length; i++) {
            wHours.push(data.forecast.forecastday[1].hour[i])
          }
        }
        setWeather(data)
        setCountry(data.location.country)

        if (unitType === "℃") {
          setcurrentWeather([data.current.temp_c, data.current.condition.text, data.location.name, data.location.localtime])
          sethourlyWeather(wHours)
          setweatherNow(wHours[0].temp_c)
          setCurrentCond(data.current.condition.text)
        }
        else {
          setcurrentWeather([data.current.temp_f, data.current.condition.text, data.location.name, data.location.localtime])
          sethourlyWeather(wHours)
          setweatherNow(wHours[0].temp_f)
          setCurrentCond(currentWeather[1])
        }
      })
    })


  }

  const fetchActivities = (lat, long) => {
    const rad = 40000
    const owaKey = "5ae2e3f221c38a28845f05b64ad184c69b35e8863bba9960fe5756ed"
    const owaUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${rad}&lon=${long}&lat=${lat}&apikey=${owaKey}`

    //set the food and tourist activities
    const actRes = fetch(owaUrl).then((actRes) => {
      const actData = actRes.json().then((actData) => {
        setFoodActivities(actData.features.filter(a => a.properties.kinds.includes("food")))
        setTouristActivities(actData.features
          .filter(a => a.properties.kinds.includes("tourist"))
          .filter(a => !a.properties.kinds.includes("food")))
      })
    })
  }


  return (
    //use router for multiple pages
    <Router>
      < div id="app" className="container" >
        <Routes>
          {/* home page */}
          <Route path="/" element={
            < Home
              setLat={setLat}
              setLong={setLong}
              style={"header"}
              currentWeather={currentWeather}
              hourlyWeather={hourlyWeather}
              dailyData={dailyData}
              unit={unit}
              weatherNow={weatherNow}
              currentCond={currentCond}
              foodActivities={foodActivities}
              touristActivities={touristActivities} />
          } />

          {/* MoreInfo Page */}
          <Route path="/moreInfo" element={
            <MoreInfo
              lat={lat}
              long={long}
              setLat={setLat}
              setLong={setLong}
              style={"header "}
              setWeather={setWeather}
              currentWeather={currentWeather}
              hourlyWeather={hourlyWeather}
              unit={unit}
              weatherNow={weatherNow}
              foodActivities={foodActivities}
              touristActivities={touristActivities}
              currentCond={currentCond}
            />
          } />

          {/* News Page */}
          <Route path="/news" element={
            <News country={country} lat={lat} long={long} />
          } />
        </Routes>

        {/* Footer */}
        <Footer setUnit={setUnit} unitCurr={unit} />
      </div>

    </Router>

  );
}
export default App;
