import Chart from "react-google-charts";
import React, { useState } from 'react';
// import AWS from 'aws-sdk';
import LineChart from "./line";
import Apex from "./apexline";
import Apex1 from "./apex1";
import Apex2 from "./apex2";
import Apex3 from "./apex3";
import Apex4 from "./apex4";
import Apex5 from "./apex5";
import Apex6 from "./apex6";
import Apex7 from "./apex7";
import Apex8 from "./apex8";
import Apex9 from "./apex9";
import Apex10 from "./apex10";
import Apex11 from "./apex11";
import Apex12 from "./apex12";
import Apex13 from "./apex13";

import AllStates from "./allStates";
import AWS from 'aws-sdk';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


let DataValue = [];
// Credentials Removed
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


  const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
  var docClient = new AWS.DynamoDB.DocumentClient();
  
  docClient.scan(params, function(err, data) {
    if (err) {
      console.log(err);
  } else {
        // console.log(data); //data you need
        DataValue = JSON.parse(data.Items[0].data);
        // console.log(DataValue);
        // for(var i = 0; i < configData.length-1; i++) {
        //     configData[i].y = parseFloat(dataValues[st][configData[i].x]);
        // }
        // console.log(lineData);
        // DataValue = data;
    }
  });


  

const arr = [["AP","Andhra Pradesh"],["DL", "Delhi"],["GJ", "Gujarat"],  ["JK", "Jammu & Kashmir"], ["KA", "Karnataka"], ["KL", "Kerala"], ["MH", "Maharashtra"], ["MP", "Madhya Pradesh"], ["PB", "Punjab"], ["RJ", "Rajasthan"], ["TG", "Telangana"], ["TN", "Tamil Nadu"], ["UP", "Uttar Pradesh"], ["WB", "West Bengal"]];


const India = () => {


const classes = useStyles();
   

    return(
      <div style={{overflowX: "unset", height: "100vh"}}>
        <p style={{textAlign:'center',fontSize:'42px',fontWeight: 'bold',}}>R<sub>t</sub> Covid-19 : India</p>
        <p style={{textAlign:'center'}}>Effective Reproduction Rate, R<sub>t</sub> , is an important way to keep a check on how fast the virus is growing. <br /><br />  It’s a measure of average number of people who might get infected by an infectious person. <br /> <br/>The virus spreads quickly, if Rt is above 1.0. When Rt is below 1.0, the virus will stop spreading.<br /><br />Below are graphs displaying R<sub>t</sub> values, statewise<br  /><br /></p>
        <p style={{textAlign:'center'}}>Note: Some features might not be as effective in Mobile View</p>
<Grid container className={classes.root} spacing={2}>
<Grid item xs={12} sm={12}>
<center>
<AllStates />
</center>
</Grid>
<Grid item xs={12} sm={6}>
    <Apex st={arr[0][0]} stname={arr[0][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex1 st={arr[1][0]} stname={arr[1][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex2 st={arr[2][0]} stname={arr[2][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex3 st={arr[3][0]} stname={arr[3][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex4 st={arr[4][0]} stname={arr[4][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex5 st={arr[5][0]} stname={arr[5][1]} dataValue={DataValue}  />
</Grid>

<Grid item xs={12} sm={6}>
    <Apex6 st={arr[6][0]} stname={arr[6][1]} dataValue={DataValue}  />
</Grid>

<Grid item xs={12} sm={6}>
    <Apex7 st={arr[7][0]} stname={arr[7][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex8 st={arr[8][0]} stname={arr[8][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex9 st={arr[9][0]} stname={arr[9][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex10 st={arr[10][0]} stname={arr[10][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex11 st={arr[11][0]} stname={arr[11][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex12 st={arr[12][0]} stname={arr[12][1]} dataValue={DataValue}  />
</Grid>
<Grid item xs={12} sm={6}>
    <Apex13 st={arr[13][0]} stname={arr[13][1]} dataValue={DataValue}  />
</Grid>
{/* <Grid item xs={12} sm={6}>
    <Apex14 st={arr[14][0]} stname={arr[14][1]} dataValue={DataValue}  />
</Grid> */}
</Grid>

<p style={{textAlign:'center'}}><br /><br /><br />A  few states have been ommitted  because the number of cases were too low for the algorithm to work on.</p>
<p style={{textAlign:'center'}}><br />A few Links:<br  /><br />1. Data : <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}}  href='https://api.covid19india.org/csv/latest/raw_data.csv'>https://api.covid19india.org/csv/latest/raw_data.csv</a><br />
2. <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}}  href='https://github.com/k-sys/covid-19/blob/master/Realtime%20R0.ipynb'>Kevin Systrom's Jupyter notebook</a><br />
3.  <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://www.vox.com/recode/2020/4/21/21227855/coronavirus-spreading-by-state-instagram-effective-reproduction-rate'>Vox's Coverage on R<sub>t</sub></a><br />
4.  <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://www.theverge.com/2020/4/18/21226483/instagram-cofounders-covid-19-systrom-krieger'>The Verge's Coverage on R<sub>t</sub></a><br /><br />

</p>
<p style={{textAlign:'center'}}>Built by <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://twitter.com/machabhargava'>Bhargava Sai Macha</a> and <a target='_blank'  style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://twitter.com/ShashwatMDas'>Shashwat M Das</a><br /><br />Based on <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://twitter.com/kevin'>Kevin Systrom</a> and <a target='_blank' style={{textDecoration:'none',color:'rgb(38, 101, 164)'}} href='https://twitter.com/mikeyk'>Mike Krieger's</a> <a style={{textDecoration:'none',color:'indianred'}} target='_blank' href='https://rt.live'>rt.live</a><br /><br /><br /></p>
</div>
    )
};
export default India;