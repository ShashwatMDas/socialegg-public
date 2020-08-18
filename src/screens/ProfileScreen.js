import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import AWS from 'aws-sdk';
import { useAlert } from 'react-alert'
//Credentials Removed
AWS.config.update({
  region: config.region,
  endpoint: config.dynamodbEndpoint,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});
let topics = [];
var itemsmap = [];
let docClient = new AWS.DynamoDB.DocumentClient();
let docClient5 = new AWS.DynamoDB.DocumentClient();
const rows = [];
if(document.cookie.replace('email=','')!=''){
let params = {
  TableName: 'socialegg',
  Key: {'email' : document.cookie.replace('email=','')},
}
docClient.scan(params, function(err, data) {
  if (err) {
    // console.log(err);
} else{
  topics = Object.keys(data['Item']['topics']);
  itemsmap  = data['Item']['topics'];
  for(var asxc = 0; asxc<topics.length;asxc++){
   // console.log(topics[asxc]);
   // console.log(itemsmap[topics[asxc]]['notifications']);
   rows.push(createData(topics[asxc],'unsubscribe',itemsmap[topics[asxc]]['notifications']));
  }
}});
}
// docClient.get(params, function(err, data) {
//   if (err) {
//       // console.log(err);
//       // console.log("There's problem with our servers, please try later");
//   } else {

//   }
//   }
// });
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  
});


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, unsubscribe, medium) {
  return { name, unsubscribe, medium};
}


const ProfileScreen = () => {
  const alert = useAlert();
    const classes = useStyles();
    const UnsubscribeTopic = (topic) =>{
      var params2 = {
        TableName:'socialegg',
        Key:{
            'email':document.cookie.replace('email=','')
        },
        UpdateExpression: "REMOVE topics.#keyword",
        ExpressionAttributeNames: { "#keyword" : topic }
    };
    docClient5.update(params2, function(err, data) {
      if (err) {
          // console.log(err);
          alert.show("There's problem with our servers, please try later");
      } else {
        alert.show("You've been successfully unsubscribed");
        window.location.reload();
      }
    });
    
    }
    

    const isVerified = () => {
    if(document.cookie.replace("email=", "") == "") {
      return (
          <div>
            Please Login to continue.
          </div>
        )
      }
      else {

        return (
        <div>
          <TableContainer component={Paper} style={{width: '80%', margin: 'auto'}}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Subscriptions</StyledTableCell>
                        <StyledTableCell align="center">Unsubscribe</StyledTableCell>
                        <StyledTableCell align="center">Medium</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <Button onClick={() => UnsubscribeTopic(row.name)} variant="contained" style={{background:'#0065A4',color:'#e3e3e3'}} >
                            Unsubscribe
                        </Button>
                        </StyledTableCell>
                    <StyledTableCell align="center">{row.medium}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <br /><br />
                <center>
                  <SettingsEthernetIcon fontSize="large" />
                </center>
        </div>
        )
      }
    }

    return (
        <div className="App">
            <Navbar  />
            <Box style={{ }}>
                <div style={{paddingTop: 60, paddingBottom: 120,  }}>
                    <img src='https://socialegg.s3.ap-south-1.amazonaws.com/news5.jpg' alt='Image could not be loaded' style={{ height: '600px', width: '100%', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                          <h3>Hello, {document.cookie.replace('email=','')}</h3>
                        <p>
                            Manage your subscriptions over here
                        </p>
                    </div>
                </div>
            </Box>
            {isVerified()}
            <Footer />
        </div>
    );

}

export default ProfileScreen;