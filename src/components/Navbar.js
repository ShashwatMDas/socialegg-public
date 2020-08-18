import React, { useState, useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import ModalBox from './Modal'
// import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import AppleIcon from '@material-ui/icons/Apple';
import axios from 'axios';
import { useAlert } from 'react-alert'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { Select } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var poolData = {
	UserPoolId: 'ap-south-1_c7BW8CdCB', 
	ClientId: '4647rtqarnj93ocab7uoqccte9'
};
var count =0;
if(document.cookie==''){
  document.cookie='email=';
}
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    style={{ height: 600 }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);





const Navbar = () => {


    const [snack, setSnack] = useState({
      opened: false,
      vertical: 'top',
      horizontal: 'center',
    });

    const { vertical, horizontal, opened } = snack;

    const classes = useStyles();

    const [state, setState] = React.useState({
      left: false,
    });


    // console.log(sessionStorage.getItem("NotifId"));

    // var idVal = [];
    // idVal.push(String(sessionStorage.getItem("NotifId")));

    // axios.post(
    //   "https://onesignal.com/api/v1/notifications", {
    //       "app_id": "b489920a-dcc3-4e13-a4f1-978e03d96d56",
    //       "include_player_ids": idVal,
    //       "headings": {"en": "News Eggs Delivered"},
    //       "contents": {"en": "Hey, you have news eggs in your nest. Check your dashboard for more info."},
    //       "url": "https://socialegg.herokuapp.com/infinity",
    //       "chrome_web_icon": "https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png",
    //       // "chrome_web_image": "https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png".
    //       "chrome_web_badge": "https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png"
    //   },
    //   {
    //     headers: {
    //       "Authorization" : "Basic ODk0MTQ5NDMtZTIwMS00MTM5LWJlZDQtYmEwOGFiYzg2YWJm",
    //       "Content-Type": "application/json"
    //     }
    //   }
    // ).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })


    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    const selectindex =(index) =>{
      if(index==0){
      return(
        <a style={{color:'#e3e3e3',textDecoration:'none'}}  href='/'>Home</a>
      )
      }
      if(index==1){
        return(
          <a style={{color:'#e3e3e3',textDecoration:'none'}}  href='/subscribe'>Subscribe</a>
        )
        }
        if(index==2){
          return(
            <a style={{color:'#e3e3e3',textDecoration:'none'}}  href='/infinity'>Infinite Scroll</a>
          )
          }
          if(index==3){
            return(
              <a style={{color:'#e3e3e3',textDecoration:'none'}}  href='/profile'>Profile</a>
            )
            }
            if(index==4){
              return(
                <a style={{color:'#e3e3e3',textDecoration:'none'}}  href='/team'>Team</a>
              )
              }
    }
    const selectimage = (index) =>{
      if(index==0){
        return(
          <HomeIcon />
        )
        }
        if(index==1){
          return(
            <MailIcon />
          )
          }
          if(index==2){
            return(
              <AllInclusiveIcon />
            )
            }
            if(index==3){
              return(
                <AccountBoxIcon />
              )
              }
              if(index==4){
                return(
                  <GroupWorkIcon />
                )
                }
    }
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List style={{marginTop: 50}}>
          {['Home', 'Subscribe','Infinite Scroll','Profile','Team'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{selectimage(index)}</ListItemIcon>
              {selectindex(index)}<br />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <AccountBoxIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </div>
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const [sources, setSources] = useState([]);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      axios.get(
        "https://newsapi.org/v2/sources?apiKey=8238274e2c804ba7846c193f425ee6d3",
      ).then(res => {
        // console.log(res.data.sources);
        setSources(res.data.sources);
      }).catch(err => {
        console.log(err);
      })
    }, [])

    const [open, setOpen] = React.useState(false);

    const HandleModalOpen = () => {
      setOpen(true);
    }

    const handleModalClose = () => {
      setOpen(false);
    };
    const alert = useAlert()
    const signout = () => {
     document.cookie="email=";
     alert.show('Successfully logged out!');
      window.location.reload();
    }

    const DrawerLoginVerify = () => {
      if(count != 0) {
        if(document.cookie != "email="){
          return true;
        }
        else return false;
      }
      else return false;
    }


    const VerifyLogin = () =>{
      if(count!=0){
        if (document.cookie!="email=") {
          if(window.innerWidth>800){
          return(
            <Button variant="contained" style={{background:'#ffffff',color:'#black'}} onClick={signout}>
          Logout
      </Button>
          )
          }
          else{
            return(
            <ExitToAppIcon  onClick={signout}></ExitToAppIcon>
            )
          }
        }
        else{
          if(window.innerWidth>800){
          return( <Button variant="contained" style={{background:'#ffffff',color:'#black'}} onClick={HandleModalOpen}>
          Login/Register &nbsp;
      </Button>);
          }
          else{
            return(
              <AccountCircleIcon onClick={HandleModalOpen}></AccountCircleIcon>
            )
          }
        }
      }
        else{
          count = count +1;
          if(window.innerWidth>800){
          return( <Button variant="contained" style={{background:'#ffffff',color:'#black'}} onClick={HandleModalOpen}>
          Login/Register &nbsp;
      </Button>);
          }
          else{
            return(
              <AccountCircleIcon onClick={HandleModalOpen}></AccountCircleIcon>
            )
          }
        }
    }

    const listitems = [];

    for(var i = 0; i < sources.length ; i++) {
                  listitems.push(<StyledMenuItem key={sources[i].id}><Checkbox value={sources[i].id} /><ListItemText primary={sources[i].name} /></StyledMenuItem>)
                }

    return (
        <div className={classes.root}>
 
            <AppBar position="static" style={{position:'fixed',background:'#0065A4'}}>
                <Toolbar>
                <React.Fragment key='left'>
                  <MenuIcon onClick={toggleDrawer('left', true)} style={{cursor: 'pointer'}} />
                  <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                    <div>
                      <img src="https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png" style={{height: 100, bottom: 70, position: 'absolute', left: '30%'}} />
                      <p style={{bottom: 10, position: 'absolute', color: 'white', fontSize: 15, textAlign: 'center', left: 10}}>
                        &#169; SocialEGG, All rights reserved
                      </p>
                    </div>
                  </Drawer>
                </React.Fragment>
    
                <Typography className={classes.title} variant="h6" >
                  <a href='/' style={{textDecoration:'none',color: 'inherit',alignItems: 'center', }}> <img class='navbarimage' align="middle" src="https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png" style={{height: 45, width: 36, verticalAlign: 'middle', paddingLeft:162}} /></a><span style={{verticalAlign: 'sub', fontSize: 15,}}>Beta</span>
                </Typography>
                {VerifyLogin()}
                 

                <ModalBox 
                  open={open}
                  CloseModal={handleModalClose}
                />
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
   root: {
    flexGrow: 1,
    position: 'inherit',
    width: "100%",
    opacity: 1,
    zIndex: 1000
  },
  menuButton: {
    flex: 1,
    display: 'flex',
    // marginLeft: 'auto',
    float: 'right',
    textAlign: 'right',
    marginRight: 0,
    // textAlign: 'right',
    // alignContent: 'right',
  },
  title: {
    // flexGrow: 1,
    flex: 1,
    textAlign: "center",
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  search: {
    position: 'relative',
    textAlign: 'center',
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

  
}));

export default Navbar;