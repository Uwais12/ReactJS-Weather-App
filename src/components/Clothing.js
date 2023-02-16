import { useEffect, useState } from "react"
import ClothingItem from "./ClothingItem"


//component to suggest clothing for the user to wear
//props:
//hourlyweather - hourly weather data
//weathernow - current weather data
const Clothing = ({ hourlyWeather, weatherNow }) => {
    const [clothes, setclothes] = useState([])


    //re-renders when hourlyWeather changes and sets the clothes state variable
    useEffect(() => {
        setclothes(getClothing(weatherNow, hourlyWeather))
    }, [hourlyWeather])


    //uses a dictionary to suggest clothing based on the weather description
    const getClothing = ((weatherNow, weatherToday) => {
        const clothing = {
            //i identify as an array
            "sunny": ["sunglasses", "suncream"],
            "rain": ["umbrella"],
            "hot": ["shorts", "tshirt"],
            "cold": ["coat", "jumper", "gloves"],
            "chilly": ["jumper", "jacket"],
            "warm": ["tshirt", "sweathsirt"],
            "snow": ["hoodie", "coat", "gloves"],
            "drizzle": ["umbrella"],

        }
        const clothes = []
        var condition;

        if (weatherNow <= 7) {
            condition = "cold";
        }
        else if (7 < weatherNow <= 13) {
            condition = "chilly";
        }
        else if (13 < weatherNow <= 15) {
            condition = "warm"
        }
        else {
            condition = "hot"
        }


        const weatherConds = []

        //gets the weather for the next couple of hours and adds the description to an array
        for (let i = 0; i < weatherToday.length; i++) {
            if (!weatherConds.includes(weatherToday[i].condition.text)) {
                weatherConds.push(weatherToday[i].condition.text)
            }
        }


        //Add the suggested clothing to an array

        for (let i = 0; i < clothing[condition].length; i++) {
            clothes.push(clothing[condition][i])

        }

        for (let i = 0; i < weatherConds.length; i++) {
            const weather = weatherConds[i].split(" ")

            for (let i = 0; i < weather.length; i++) {
                if (weather[i] in clothing) {

                    if (!clothes.includes(clothing[weather[i]])) {

                        for (let k = 0; k < clothing[weather[i]].length; k++) {
                            if (!clothes.includes(clothing[weather[i]][k])) {
                                clothes.push(clothing[weather[i]][k])
                            }
                        }
                    }
                }
            }
        }
        return clothes
    })


    return (
        <div className='info-card'>
            <h2>Suggested Clothing</h2>
            <div>
                {/* Its {hourlyWeather[0].condition.text} and a little {condition} today */}
                {clothes.map((item) => (
                    <ClothingItem key={item} item={item} />

                ))}

            </div>
        </div>
    )
}

export default Clothing