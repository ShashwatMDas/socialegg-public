import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts'
import AWS from 'aws-sdk';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
let dataValues = [];

// var docClient = new AWS.DynamoDB.DocumentClient();

const one = new Date();
one.setFullYear(2020, 2, 31);
const two = new Date();
let diff = two.getTime() - one.getTime();
diff = diff/(86400000);
// console.log(diff);
let configData = [];
let lineData = [];
for(var i = 0; i < diff; i++)
{   
    const three = new Date();
    three.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()+i);
    configData.push({ x: String(three.getDate())+"/"+String(three.getMonth()+1), y: ""});
    lineData.push({x: String(three.getDate())+"/"+String(three.getMonth()+1), y: 1})
}
let data1 = configData;
let count = 0;
let z = new Date();
z = two - 86400000;
let m = new Date();
m.setTime(z);
let x = String(m.getDate())+"/"+String(two.getMonth()+1);
let y = x;





const ApexChart = ({ st, dataValue, stname }) => {

      
      if(Object.keys(dataValue).length != 0){
            configData = data1;
            x = y;
            // console.log(count);
            for(var i = 0; i < configData.length; i++) {
                configData[i].y = parseFloat(dataValue[st][configData[i].x]).toFixed(2);
            }
            // console.log(x);
            x = parseFloat(dataValue[st][x]).toFixed(2);
            // console.log(configData);
            // console.log(x);
           
      }

      const [state, setState] = useState([{
      
        series: [{}],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          chart: {
              dropShadow: {
                  enabled: true,
                  // enabledOnSeries: undefined,
                  top: 30,
                  left: 20,
                  blur: 3,
                  color: '#000',
                  opacity: 0.35
              }
          },


          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: '',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          noData: {
            text: 'Loading...'
          }
        },
      
      
      }])
    // }


    useEffect(() => {
        if(count < 1){
          console.log(count);
        setTimeout(() => {
          // console.log(configData);
        setState([{

        series: [{
          name: 'Rt',
          data: configData
        },{
          name: 'Threshold',
          data: lineData
        }],
                  chart: {
              dropShadow: {
                  enabled: true,
                  enabledOnSeries: undefined,
                  top: 0,
                  left: 0,
                  blur: 3,
                  color: '#000',
                  opacity: 0.35
              }
          },


       options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#2665a4", "#E91E63"],
          stroke: {
            curve: 'smooth',
            // colors: ["rgb(220, 57, 18)"]
          },
          title: {
            // text: String(x),
            // align: 'center'
          },
          grid: {
            row: {
              colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
        }
      
        }])
      }, 3000);
        }

      configData = [];
      count++;
    }, [])

      


  

    // render() {
      return (
        <div>
        
        <center>
        { x >= 1.2 ?  <h3 style={{color: "#da2929"}}>{stname} | {(x)}</h3> : "" }{ x < 1.2 && x > 0.8 ?  <h3 style={{color: "#f1be61"}}>{stname} | {(x)}</h3> : "" }{ x <= 0.8 ?  <h3 style={{color: "#28d028"}}>{stname} | {(x)}</h3> : "" }<hr />
        <Chart options={state[0].options} series={state[0].series} type="line" style={{ width: "90%",color:'black',backgroundColor:'#e3e3e3'}} />
        </center>
        </div>

      );
    // }
  }

export default ApexChart;