import React, { PureComponent, useState, useEffect }from 'react';
import Button from '@material-ui/core/Button';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import AWS from 'aws-sdk';
// Credentials removed
  AWS.config.update({
    region: config.region,
    endpoint: config.dynamodbEndpoint,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  });
  const params ={
      TableName:'covid',
      Key:{
        "id": 1,
    }
  }
var docClient = new AWS.DynamoDB.DocumentClient();
var charts = [];
let configData = [];
let dataValues = [];
var count = 1;
const jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
class CustomizedDot extends React.Component {
    render() {
        const { cx, cy } = this.props;

        return (
        <text x={cx-9} y={cy-13} >{(this.props.payload)['name']}</text>
        );
    }
  };
  const  oneweek = [];
  var finalData1 = [];
  const ten  =  [];
function AllStates() {
    const [finalData, setfinalData] = useState([]);
    const change = (thing) =>{
        if(thing=='yes'){
                setfinalData([...finalData1 ]);
        }
        if(thing=='wee'){
                setfinalData([...oneweek ]);

        }
        if(thing=='ten'){
            setfinalData([...ten ]);

    }

    }
 

    useEffect(() => {
        if(count===1){
        docClient.scan(params, function(err, data) {
            if (err) {
              console.log(err);
          } else {
                // console.log(data); //data you need
                dataValues = JSON.parse(data.Items[0].data);
                // for (var p in dataValues){
                //     for(var q in dataValues[p]){
                //         configData.push({date: String(q), value: dataValues[p][q]})
                //     }
                // }
                // console.log(configData);
                for(var i = 0; i < configData.length; i++) {
                    configData[i].value = parseFloat(dataValues.AP[configData[i].date]);
                    // configData[i].date = i+31;
                }
                // setTimeout(() => {
                //     charts = configData;
                //     console.log("dasd", charts);
                // }, 2000)
                const one = new Date();
                const two = new Date();
                const three = new Date();
                one.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()-1);
                two.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()-7);
                three.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()-10);
                const yesterday = String((one.getDate()))+"/"+String(one.getMonth()+1);
                const onweekback = String((two.getDate()))+"/"+String(one.getMonth()+1);
                const tenda = String((three.getDate()))+"/"+String(one.getMonth()+1);
                // console.log(yesterday);
                // console.log(Object.keys(dataValues));
                var states = Object.keys(dataValues);
                var finalData2 = [];
                var finalData3 = [];
                finalData1.push({name:'',Rt:'', threshold:1})
                oneweek.push({name:'',Rt:'', threshold:1})
                ten.push({name:'',Rt:'', threshold:1})
                for(var j=0; j<Object.keys(dataValues).length;j++){
                   var uv = dataValues[states[j]][yesterday];
                   var vv = dataValues[states[j]][onweekback];
                   var qv = dataValues[states[j]][tenda];
                   var state = states[j]
                   finalData1.push({name:state,Rt:(parseFloat(uv).toFixed(2)),threshold:1})
                   oneweek.push({name:state,Rt:(parseFloat(vv).toFixed(2)),threshold:1})
                   ten.push({name:state,Rt:(parseFloat(qv).toFixed(2)),threshold:1})
                }
                // console.log(finalData1)
                setfinalData([ ...finalData, ...finalData1 ]);
                // console.log(finalData);
            }
        });
        count = count +1;
        return;
    }
    })
    return (
      <div>
      <Button variant="contained" color="primary" onClick={()=>change('yes')}>
      Yesterday
      </Button>&nbsp;
      <Button variant="contained" color="primary" onClick={()=>change('wee')}>
        A Week Back
      </Button>&nbsp;
      <Button variant="contained" color="primary" onClick={()=>change('ten')}>
      10 Days Back
      </Button><br/><br/>
      <LineChart
        width={1000}
        height={500}
      style={{color:'#2e2e2e',backgroundColor:'#e3e3e3', overflowX: "auto", overflowY: "hidden", width: "90%", maxWidth: "1000px"} }
        data={finalData}
        margin={{
          top: 50, right: 30, left: 20, bottom: 5,
        }}
      >
           <defs>
        <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop offset="100%" stopColor="green" />
        </linearGradient>
      </defs>
        {/* <CartesianGrid/> */}
        <XAxis dataKey="name" />
        <YAxis domain={[-1, 3]} />
        <Tooltip />
        <Legend />
         {/* dot={<CustomizedDot />} */}
        <Line type="monotone" dataKey="Rt" stroke="url(#colorUv)" activeDot="url(#colorUv)"   strokeWidth={5}/>
        <Line type="monotone" dataKey="threshold" stroke="#82ca9d" dot={false}activeDot={false} />
      </LineChart>
      </div>
    );
  }
export default AllStates;