import { useState, useEffect } from "react"

//takse props of the activity name and distance and displays the information
const Activity = ({ name, distance }) => {

    return (
        <div className="activity">
            <div className="activityName">
                {name.substring(0, 15)}
            </div>
            <div className="activityDist">
                {distance.toString().substring(0, 4)}
            </div>

        </div>
    )
}

export default Activity