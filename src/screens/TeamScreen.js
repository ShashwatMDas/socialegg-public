import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import shashwat from '../images/shashwat.jpg';
import macha from '../images/macha.jpg'
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '350px',   
        color: '#c5c5c5', 
        marginTop: 50,
        boxShadow: "0px 12px 35px rgba(92, 141, 255, .22)",
    }
}))


const TeamScreen = () => {

    const classes = useStyles();

    return (
        <div className="App">
            <Navbar />
            <div style={{paddingTop: 150, }}>
                <h1 >
                    The Team
                </h1>
                <Grid container>
                    <Grid xs={12} sm={6}>
                        <center>
                        <Card className={classes.card}>
                            <CardContent>
                                <img src={macha} style={{height: '50%', width: '90%'}} />
                            </CardContent>
                            <CardContent>
                                <span> Bhargava Sai Macha</span><br />
                                
                                <p>
                                    <a href="https://www.facebook.com/bhargavasai.macha"><FacebookIcon style={{ color: 'white' }} /></a>
                                    <a href="https://www.instagram.com/bhargava_macha/"><InstagramIcon style={{ color: 'white' }} /></a>
                                    <a href="https://www.linkedin.com/in/bhargava-sai-macha-941241172/"><LinkedInIcon style={{ color: 'white' }} /></a>
                                </p>
                            </CardContent>
                        </Card>
                        </center>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <center>
                        <Card className={classes.card}>
                            <CardContent>
                                <img src={shashwat} style={{height: '50%', width: '90%'}} />
                            </CardContent>
                            <CardContent>
                                <span> Shashwat M. Das </span>
                                <span></span>
                                <p>
                                    <a href="https://www.facebook.com/yupiamshashwat"><FacebookIcon style={{ color: 'white' }} /></a>
                                    <a href="https://www.instagram.com/shashwatmdas/"><InstagramIcon style={{ color: 'white' }} /></a>
                                    <a href="https://www.linkedin.com/in/shashwat-m-das-92bb8b156/"><LinkedInIcon style={{ color: 'white' }} /></a>
                                </p>
                            </CardContent>
                        </Card>
                        </center>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    )
}

export default TeamScreen;