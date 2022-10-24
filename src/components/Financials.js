import React, {useState, useEffect} from 'react'

export default function Financials({symbol}) {

    const [financials, setFinancials] = useState(false);

    useEffect(() => {
        fetchFinancials(symbol)
    }, [symbol]);

    function fetchFinancials (sym) {
        fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${sym}&metric=all&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`)
        .then((response) => response.json())
        .then((data) => {
          setFinancials(data);
          console.log(data);
        });
      };

  return (
    <div className='container-xxl mt-4 mb-4 bg-light text-dark text-center'>
        {financials &&
        <>
        <div className="row">
          <div className="col border border-1"><p><span className="text-secondary">P/E</span> {Math.round(financials.metric.peBasicExclExtraTTM*100)/100}</p></div>
          <div className="col border border-1"><p><span className="text-secondary">Market Cap</span> {Math.round(financials.metric.marketCapitalization).toLocaleString("en-US")}M</p></div>
          <div className="col border border-1"><p><span className="text-secondary">Price / Book Value (Annual)</span> {Math.round(financials.metric.ptbvAnnual*100)/100}</p></div>
          <div className="col border border-1"><p><span className="text-secondary">Current Dividend Yield</span> {Math.round(financials.metric.currentDividendYieldTTM*100)/100}%</p></div>
        </div>
        <div className="row">
          <div className="col border border-1"><p><span className="text-secondary">Debt / Equity (Annual)</span> {Math.round(financials.metric['longTermDebt/equityAnnual']*100)/100}</p></div>
          <div className="col border border-1"><p><span className="text-secondary">Cash Flow / Share (Annual)</span> {Math.round(financials.metric.cashFlowPerShareAnnual*100)/100}</p></div>
          <div className="col border border-1"><p><span className="text-secondary">beta</span> {Math.round(financials.metric.beta*100)/100}</p></div>
          <div className="col border border-1"><p><span className="text-secondary">Price relative to S&P500 (YTD)</span> {Math.round(financials.metric['priceRelativeToS&P500Ytd']*100)/100}</p></div>

        </div>
            
            
            
            
            
            
            
        </>
        }
        
    </div>
  )
}

