import React, {useState, useEffect} from 'react'

export default function Quote({symbol}) {

    const [quote, setQuote] = useState(false);

    useEffect(() => {
        fetchQuote(symbol)
    }, [symbol]);

    function fetchQuote (sym) {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
        .then((response) => response.json())
        .then((data) => {
          setQuote(data);
          console.log(data);
        });
      };

  return (
    <div className='container'>
        {quote &&
        <div className="container text-center d-flex flex-row justify-content-center align-items-center p-1">
          <h2 className="pe-2">${Math.round(quote.c*100)/100}</h2>
          <h4 className={quote.dp > 0 ? "text-success ps-1 pe-1" : "text-danger ps-1 pe-1"}>{quote.d > 0 ? "+" + Math.round(quote.d*100)/100 : Math.round(quote.d*100)/100}</h4>
          <h4 className={quote.dp > 0 ? "text-success ps-1 pe-1" : "text-danger ps-1 pe-1"}>{quote.dp > 0 ? "(+" + Math.round(quote.dp*100)/100 + "%)" : "(" + Math.round(quote.dp*100)/100 + "%)"} {quote.d > 0 ? '↑' : '↓'}Today</h4>
        </div>
        }
    </div>
  )
}
