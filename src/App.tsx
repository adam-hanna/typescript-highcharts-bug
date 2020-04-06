import React, { useEffect, useState } from 'react';
import './App.css';
import Highcharts from 'highcharts/highstock';
//import Highcharts from 'highcharts'; <<<<< this import doesn't work, either

const App = () => {
  const [data, setData] = useState<Array<Array<number>>>([]);

  useEffect(() => {
    ;(async function() {
      try {
        const tmpData = Highcharts.getJSON('https://www.highcharts.com/samples/data/aapl-c.json');
        setData(tmpData);
      } catch(e) {
        window.alert(e);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('data', data);
    if (!data || data.length === 0) return;

    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'AAPL Stock Price'
      },

      series: [{
        name: 'AAPL',
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    });
  }, [data]);

  return (
    <div className="App">
      <div id="container" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default App;
