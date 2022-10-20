import React, {useState, useEffect, useRef} from 'react';
import News from './components/News';
import Quote from './components/Quote';
import Financials from './components/Financials';
import Candles from './components/Candles';
import Info from './components/Info';





export default function App() {

  const [symbol, setSymbol] = useState('AAPL');
  const [pendingSymbol, setPendingSymbol] = useState('AAPL');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testSymbol, setTestSymbol] = useState('AAPL');
  

  

  useEffect(() => {
    setLoading(true);
    fetchSymbol(pendingSymbol);
  }, [pendingSymbol]);

  useEffect(() => {
    test(testSymbol);
  }, [testSymbol])


  function test (sym) {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return "ERROR";
      };
    })
    .then((data) => {
      if (data === "ERROR") {
        setError(true);
      } else {
        setError(false);
        setSymbol(testSymbol);
      };
    });
  }

  function fetchSymbol (sym) {
    console.log(sym, sym.length)
    if (sym.length < 2) {
      setError(true);
      setLoading(false);
      return;
    } else {
      fetch(`https://finnhub.io/api/v1/search?q=${sym}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
      .then((response) => response.json())
      .then((data) => {
      if (data.result.length) {
        setError(false);
        setTestSymbol(data.result[0].symbol);
      } else {
        setError(true);
      };
      setLoading(false);
    });
    }
    
  };


  return (
    <>


            

      

      <Info symbol={symbol} error={error} setPendingSymbol={setPendingSymbol} loading={loading}/>
      <Quote symbol={symbol}/>
      <Candles symbol={symbol}/>
      <Financials symbol={symbol}/>
      <News symbol={symbol}/>
    </>
    
  )
}

