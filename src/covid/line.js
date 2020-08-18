import React, { useState, useEffect } from "react";
import { LineChart } from "@opd/g2plot-react";
import AWS from 'aws-sdk';

let dataValues = [];

//Credentials removed
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

const one = new Date();
one.setFullYear(2020, 2, 31);
const two = new Date();
// two.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()+1);
// const date = one.getDate();
// const month = one.getMonth() + 1;
// const yr = one.getFullYear();
// console.log(two);
let diff = two.getTime() - one.getTime();
diff = diff/(86400000);
console.log(diff);
let configData = [];
for(var i = 0; i < diff; i++)
{   
    const three = new Date();
    three.setFullYear(one.getFullYear(), one.getMonth(), one.getDate()+i);
    configData.push({date: String(three.getDate())+"/"+String(three.getMonth()+1), value: ""});
}
console.log(configData);
var charts = [];

const data = []
 

const Line = () => {


        
    // if(charts.length != 0){

        data[0] = {
            // title: {
                //   visible: true,
                //   text: "asda"
                // },
                //   description: {
                    //     visible: true,
                    //     text: "用平滑的曲线代替折线。"
                    //   },
                    padding: "auto",
                    forceFit: true,
                    data: charts,
                    xField: "date",
                    yField: "value",
                    smooth: true,
                    meta: {
                        date: {
                            alias: "Date"
                        },
                        value: {
                            alias: "Rt"
                        }
                    }
                };
        // }
                
    useEffect(() => {
        docClient.scan(params, function(err, data) {
            if (err) {
              console.log(err);
          } else {
                console.log(data); //data you need
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
                charts = configData;
                console.log(dataValues);
            }
        });
    }, [])


        // setTimeout(() => {
        //     setChartData(dataValues);
        //     console.log(chartData);
        // }, 3000);

    return (
        <section>
            <h2>{}</h2>
            {<LineChart {...data[0]} />}
        </section>
    );
}


export default Line;
