import React from 'react'
import { useEffect, useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa';


//compoent to search for a city to get the weather
//props:
//setLat and setLong - functions to change the location
const Search = ({ setLat, setLong }) => {

    //set state variables
    //text -the users current search
    //displayCity - city autofill suggestion
    //showSuggestion - to display the suggestion on the screen
    const [text, setText] = useState([])
    const [displayCity, setDisplayCity] = useState("none")
    const [showSuggestion, setShowSuggestion] = useState(false)

    //function to use the users current location
    function setLoc() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);

        });

    }

    //funtion to set the Latitude and longitude and clear the search box
    function setLocInfo() {

        setLat(displayCity.lat)
        setLong(displayCity.lon)
        document.getElementById('searchCity').value = ''
        setDisplayCity("none")
        setText([])
    }

    //funcrtion to check the response from the api due to the users search
    function CheckError(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    //connects to the api and get info about the city the user searches for. 
    //As the users input changes it suggests a city (as returned by the api)
    //if the api returns nothing will display none
    function setCC(city) {
        const apiKey = "45ffea8100064f028b9133756220103"
        const url = `http://api.weatherapi.com/v1/timezone.json?key=45ffea8100064f028b9133756220103&q=${city}`
        if (city.length >= 3) {
            setShowSuggestion(true)
            fetch(url)
                .then(CheckError)
                .then(data => {
                    // Work with JSON data here

                    setDisplayCity(data.location)
                }).catch((error) => {
                    // Handle the error
                    setDisplayCity("none")
                });

        }
        else {
            setDisplayCity("none")
            setShowSuggestion(false)
        }

    }

    //when the users search changes, it will connect to the api to search again for the city according to the users search
    useEffect(() => {
        setCC(text)
    }, [text])

    return (
        <div id='search'>

            <div className='searchBar'>
                <input
                    id='searchCity'
                    type="text"
                    placeholder="Search City..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {/* 
                    display suggestions if there are any 
                    if the user clicks on one of the city suggestions it will call setLocInfo to update the location information
                */}
                {
                    displayCity === "none" ? <div className={showSuggestion ? 'shown' : 'notShown'} id="citySuggestion">No cities found</div> : <div id='citySuggestion' className={showSuggestion ? 'shown' : 'notShown'}><button id='citySuggestButton' onClick={setLocInfo}>{displayCity.name}</button></div>
                }
            </div>

            {/* if the user clicks on this button it will call setLoc which will get the users current location */}
            <div>
                <button
                    onClick={setLoc}
                >{<FaLocationArrow />}</button>
            </div>



        </div>
    )
}

export default Search