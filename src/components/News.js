import { useEffect, useState } from "react"
import NewsCard from "./NewsCard"

//get local news component
//porops:
//lat and long - current location
//country - current country
const News = ({ country, lat, long }) => {
    //set state variables of news and country abbreviation
    const [countryCur, setCountry] = useState('gb')
    const [news, setNews] = useState([])

    //when lat and long change, call setCC and getNews to update the country and the news for the country
    useEffect(() => {
        setCC()
        getNews()

    }, [lat, long])

    //connect to api to get the abbreviation for a country
    function setCC() {
        const apiKey = "4334cd985e0e4f07a295202c0efdd536"
        const url = `http://api.geonames.org/countrySubdivisionJSON?lat=${lat}&lng=${long}&username=uwii`

        //fetch url
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            // Work with JSON data here
            //set country state variable
            setCountry(data.countryCode);
        })
    }

    //connect to api to get the news for the country
    const getNews = async () => {
        const apiKey = '4334cd985e0e4f07a295202c0efdd536'
        const url = `https://newsapi.org/v2/top-headlines?country=${countryCur}&apiKey=${apiKey}`

        //fetch the url
        const res = fetch(url).then((res) => {
            var test = []

            const data = res.json().then((data) => {
                data = data.articles
                data.map((d) => {
                    //add information about each article to an array
                    test.push(
                        {
                            "title": d.title,
                            "description": d.description,
                            "source": d.source.name,
                            "url": d.url,
                        }
                    )

                })
                //set the state variable
                setNews(test)
            })
        })

    }

    return (

        < div className="news">
            <div>
                News for {country}
            </div>
            <div id="newsSection">
                {
                    // map the news articles
                    news.map((t) => {

                        return <NewsCard key={t.url} id={t.url} title={t.title} source={t.source} desc={t.description} url={t.url} />


                    })
                }
            </div >
        </div >
    )
}
export default News