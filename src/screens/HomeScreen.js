import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Grid from '@material-ui/core/Grid';
import leftpnt from '../images/leftpnt.png'
import rightpnt from '../images/rightpnt.png'
import exclam from '../images/exclam.jpeg'
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import ChevronLeftSharpIcon from '@material-ui/icons/ChevronLeftSharp';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScrollAnimation from 'react-animate-on-scroll';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AndroidIcon from '@material-ui/icons/Android';
import $ from 'jquery';
import { useAlert } from 'react-alert';
var count = 1;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: 'white',
    boxShadow: "0px 10px 20px rgba(92, 141, 255, .22)",
    backgroundColor: '#454545',
  },
  themecolour: {
    color: 'white',
    backgroundColor: '#2665a4',
    margin: 'auto',
    objectFit: 'contain',
  },
}));
$('#tre').click();
const HomeScreen = ( ) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const alert = useAlert();
  const classes = useStyles();
const showalert = () =>{
  if(count==1){
  alert.show('Add Social EGG to homescreen for enhanced experience. ');
  count = count+1;
  }
}

  return (
    <div className="App">
      <Navbar />
      <Slider /><br /><br />
      {showalert()}     
      <ScrollAnimation animateIn="fadeInRight" animateOnce={true}>
      <Grid container spacing={0} style={{marginTop: 50}}>
        <Grid item sm={3} />
        <Grid item sm={8} elevation={15} style={{textAlign: 'justify', margin: 30, float: 'right'}}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
            Register and verify your email for logging in. Profle Page, Infinity Scroll and the Subscribe pages can only be accessed when logged in.
            
               </Grid>
            <Grid item style={{display: 'flex',}}>
              <Avatar className={classes.themecolour}>
                <ChevronLeftSharpIcon />
              </Avatar>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
      </ScrollAnimation>
       <ScrollAnimation animateIn="fadeInLeft" animateOnce={true}>
      <Grid container spacing={1} style={{marginTop: 50}}>
        <Grid item sm={1} />
        <Grid item sm={8} elevation={15} style={{textAlign: 'justify', margin: 30}}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item style={{display: 'flex',}}>
              <Avatar className={classes.themecolour}>
                <ChevronRightSharpIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
             Fill out the subscription form in the subscribe page and mention the ways you'd like to receive the notifications.
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
      </ScrollAnimation>
      
      <ScrollAnimation animateIn="fadeInRight" animateOnce={true}>
      <Grid container spacing={0} style={{marginTop: 50}}>
        <Grid item sm={3} />
        <Grid item sm={8} elevation={15} style={{textAlign: 'justify', margin: 30, float: 'right'}}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
            For In-App Notifications, choose In-App in the subscription form and go on to the Infinite Scroll Page, Choose a topic and Keep refreshing to get real time articles mentioning the topic you choose.
             
            </Grid>
            <Grid item style={{display: 'flex',}}>
              <Avatar className={classes.themecolour}>
                <ChevronLeftSharpIcon />
              </Avatar>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInLeft" animateOnce={true}>
      <Grid container spacing={1} style={{marginTop: 50}}>
        <Grid item sm={1} />
        <Grid item sm={8} elevation={15} style={{textAlign: 'justify', margin: 30}}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item style={{display: 'flex',}}>
              <Avatar className={classes.themecolour}>
                <ChevronRightSharpIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
            Old School? We dig you. Choose Email while filling out the subscription form. Email notifications are sent with a particular frequency that can be set while filling the subscription form.
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInRight" animateOnce={true}>
      <Grid container spacing={0} style={{marginTop: 50}}>
        <Grid item sm={3} />
        <Grid item sm={8} elevation={15} style={{textAlign: 'justify', margin: 30, float: 'right'}}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
            For an enhanced experience, get Social EGG installed onto your phone.<br />
           Android Users : Click on Chrome options (top right) and select "Add to homescreen"<br />
          IOS Users: Use Safari, click on share and select "Add to homescreen".            
               </Grid>
            <Grid item style={{display: 'flex',}}>
              <Avatar className={classes.themecolour}>
                <ChevronLeftSharpIcon />
              </Avatar>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
      </ScrollAnimation>
      <Footer />
    
    </div>
  );
}

export default HomeScreen;
