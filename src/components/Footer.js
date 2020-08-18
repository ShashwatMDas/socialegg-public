import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import CopyrightIcon from '@material-ui/icons/Copyright';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
  },
  divider: {
    backgroundColor: 'white',
  },
}));

const theme = {
  spacing: 8,
}

const Footer = () => {

    const classes = useStyles();

    return (
        <Box style={styles.footer}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                <a href='/' style={{textDecoration:'none',color: 'inherit',}}><img src="https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png" style={{height: 45, width: 36,paddingLeft: 10,verticalAlign: 'middle'}} /><span style={{verticalAlign: 'inital', fontSize: 15}}>Beta</span><br />Social EGG</a>
                    <br />
                    <hr id='line' style={{width:'250px', opacity:0.2}}></hr>
                    <Typography variant="h6" gutterBottom> 
                    Information, Simplified.
                    </Typography>
                    <a target="_blank" href='https://www.linkedin.com/company/social-egg'><LinkedInIcon /></a>&nbsp;&nbsp;<a target="_blank" href = 'https://www.instagram.com/the_social_egg/'><InstagramIcon /></a>
                </Typography>
                </Grid>
                
                <Grid item xs={12}>
                <Typography variant="h6" gutterBottom> 
            Made with &#10084; and &#9749;
                </Typography>
                </Grid>
            </Grid>
            <p>
            &#169; Social EGG, All rights reserved<br />
            Powered by <a href='https://www.newsapi.org' style={{textDecoration:'none',color:'inherit'}} target='_blank'>NewsAPI</a>
            </p>
        </Box>
    )

}   

const styles = {
    footer: {
        backgroundColor: "#454545",
        color: "#e3e3e3",
        // paddingBottom: 2,
        // paddingTop: 40,
        padding: 27,
        marginTop: 100,
        verticalAlign: "bottom"
    }
}

export default Footer;