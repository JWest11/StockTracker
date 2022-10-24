import React, {useState, useEffect} from 'react';
const Highcharts = require('highcharts/highstock');
require('highcharts/themes/brand-light')(Highcharts);


export default function Candles({symbol}) {

    const [candles, setCandles] = useState(false);

    useEffect(() => {
        fetchCandles(symbol)
    }, [symbol]);

    useEffect(() => {
        constructChart(candles);
        console.log(candles);
    }, [candles])

    function fetchCandles (sym) {
        let dateObject = new Date();
        let t2 = Date.now()-(60000*5);
        let t1 = dateObject.setYear(dateObject.getYear()-1)-(60000*5);
        t2 = Math.floor(t2/1000);
        t1 = Math.floor(t1/1000);
        const res = 'D';

        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${sym}&resolution=${res}&from=${t1}&to=${t2}&token=cd1kt9aad3i7tm8rvtm0cd1kt9aad3i7tm8rvtmg`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCandles(data);
        });
    };
    
    function constructChart (data) {
        if (!data.c) {return};
        let dataParsed = [];
        for (let i=0; i<data.c.length; i++) {
            dataParsed.push([data.t[i]*1000, data.o[i], data.h[i], data.l[i], data.c[i]])
        };
        const chart = Highcharts.stockChart('candleChart', {
            chart: {
                    style: {
                        fontFamily: 'IBM Plex Sans, sans-serif'
                    }
                },
            rangeSelector: {
                selected: 0
            },
            plotOptions: {
                candlestick: {
                    lineColor: null,
                    color: '#d16075',
                    upColor: '#57C45E',
                    upLineColor: '#57C45E'
                },     
            },
            title: {
                text: `${symbol} Stock Price`
            },
            series: [{
                type: 'candlestick',
                name: `${symbol} Stock Price`,
                data: dataParsed,
                units: ['day', [1]]
            }]
        });
    };
    

  return (
    <div className='container-xxl bg-light p-2 d-flex justify-content-center flex-column'>
        <div id="candleChart" className="chartContainer container"></div>
    </div>
  )
}
