import React from 'react'
const imgSrc = require('./newsStock.jpg');

export default function Story({i, news}) {


  return (
    (i < news.length ? 
    <div className="col p-4 border border-1 newsStoryContainer">
        <h4>{news[i].headline} <span className="text-secondary newsSourceText">{news[i].source}</span></h4>
        <div className='row pt-2 pb-2 align-items-center'>
            <div className="col newsCol"><p>{news[i].summary}</p></div>
            <div className="col newsCol">
                <img className="newsImage" src={news[i].image ? news[i].image : imgSrc}></img>
            </div>
        </div>
        <a target="blank" className="btn btn-dark border" href={news[i].url}>View Story</a>                    
    </div>
    :
    <div></div>
    )
  )
}
