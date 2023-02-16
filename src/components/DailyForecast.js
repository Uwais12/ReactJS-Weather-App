import React from 'react'

//component to display the daily forecast
//props: 
//dailyData - information about each day
//unit - the unit of the temperature (degrees C or F)
const DailyForecast = ({ dailyData, unit }) => {

    let i = 0;

    const current = new Date();

    return (
        <div className='info-card dailyForecast' >
            <h2 id='dITitle'>Daily Forecast</h2>
            {
                dailyData.map((d) => {

                    var newDate = new Date(current)
                    newDate.setDate(newDate.getDate() + i)

                    var dateS = newDate.toString().substring(0, 10)
                    if (i == 0) {
                        var today = true
                    }
                    { i = i + 1 }

                    //for each day, display the date, temperature and description of the weather
                    return <div key={dateS} className='dailyInfo'>
                        <div>
                            {today ? "Today" : dateS}
                        </div>
                        <div>
                            <div>
                                {d.temp.day}{unit}
                            </div>
                            <div>{d.weather[0].description}</div>
                        </div>
                    </div>

                })

            }
        </div >
    )
}

export default DailyForecast