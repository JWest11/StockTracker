import React, {useEffect, useState, useRef} from 'react'

export default function Info({symbol, error, setPendingSymbol, loading}) {

    const [info, setInfo] = useState(false);
    const inputRef = useRef();

    function handleChangeTicker (e) {
      if (inputRef.current.value !== '') {
        setPendingSymbol(inputRef.current.value)
      };
    };

    useEffect(() => {
        fetchQuote(symbol)
    }, [symbol]);

    function fetchQuote (sym) {
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${sym}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
        .then((response) => response.json())
        .then((data) => {
          setInfo(data);
          console.log(data);
        });
      };

  return (
    <div className='container mt-4 mb-2'>
      
      {error ? <h3 className='text-danger text-center'>Invalid Symbol</h3> : <></>}
        {info &&
        <div className='container text-center d-flex flex-column'>
          <h1>{info.name} {symbol}</h1>
          <a className="p-1" target="_blank" href={info.weburl}>{info.weburl}</a>
          {loading ?
          <h3 className="text-warning text-center p-2">Loading...</h3>
          :
          <div className="container p-2 d-flex flex-row justify-content-center">
            <input className="form-control tickerInput bg-secondary border-dark text-light" type="text" ref={inputRef}/>
            <button className="btn btn-secondary" onClick={handleChangeTicker}>Change Symbol</button>
          </div>
          }
          
            
            
            
        </div>
        }
    </div>
  )
}
