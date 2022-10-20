import React, {useState, useEffect} from 'react'
import Story from './Story'


export default function News({symbol}) {

    const [news, setNews] = useState(false);

    useEffect(() => {
        fetchNews(symbol);
    }, [symbol]);

    function fetchNews (sym) {
        const dateObject = new Date;
        const currentDateString = dateObject.toISOString().split('T')[0];
        dateObject.setMonth(dateObject.getMonth()-1);
        const previousDateString = dateObject.toISOString().split('T')[0];
        fetch(`https://finnhub.io/api/v1/company-news?symbol=${sym}&from=${previousDateString}&to=${currentDateString}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
        .then((response) => response.json())
        .then((data) => {
          setNews(data);
          console.log(data);
        });
      };

  return (
    <>
    <div className='container-xxl bg-light text-dark mb-4 border border-3 border-secondary'>
    <h2 className="text-center p-2">Related News</h2>
          {news && 
          <>
              {[...Array(2)].map((x,i) => 

                <div key={i} className="row">
                  <Story i={2*i} news={news}/>
                  <Story i={2*i+1} news={news}/>
                </div>
              )}
          </>
          }
    </div>
    </>
    
  )
}
