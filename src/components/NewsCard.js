
//component to show info about each news article
const NewsCard = ({ title, source, desc, url }) => {
    return (
        <div className="newsCard">

            <div className="title">
                {title}
            </div>
            <div className="side desc" >
                {desc}
            </div>
            <div className="side url" >
                <a href={url}>{source}</a>
            </div>
        </div>
    )
}

export default NewsCard