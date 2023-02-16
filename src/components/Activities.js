// Component to show suggested/nearby activities

import { useEffect, useState } from "react"
import Activity from "./Activity"


//takes props of: latitude and longitude, food places nearby and tourist activities
const Activities = ({ lat, long, foodActivities, touristActivities }) => {

    //re-render and run the following code when the latitude and logitude change
    useEffect(() => {

    }, [lat, long])


    return (
        <div className='info-card actsInfo'>
            <h2>Activities</h2>
            <div className="">

                <h3>Attractions</h3>
                {/* Displays all the activites by using the map function */}
                <div className="activities">
                    {
                        touristActivities.map((item) => (
                            <Activity key={item.id} name={item.properties.name} distance={item.properties.dist} />

                        ))
                    }
                </div>
                <h3>Food</h3>
                {/* Displays all the food places nearby by using the map function */}

                <div className="activities">

                    {

                        foodActivities.map((item) => (

                            < Activity key={item.id} name={item.properties.name} distance={item.properties.dist} />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Activities