import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import InitialDescription from '../components/InitialDescription';
import KeyWords from '../components/KeyWords';
import Frequency from '../components/Frequency';
import Submit from '../components/Submit';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Email from '../components/Email';
import Footer from '../components/Footer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import validator from 'validator';
import AWS from 'aws-sdk';
import ImageGridList from '../components/Gallery';
import Slider from '../components/Slider';
import { useAlert } from 'react-alert'
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import LoadingOverlay from 'react-loading-overlay'

var tont = '';
// Credentials Removed
AWS.config.update({
  region: config.region,
  endpoint: config.dynamodbEndpoint,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});
let docClient = new AWS.DynamoDB.DocumentClient();
let docClient123 = new AWS.DynamoDB.DocumentClient();
let docClient1234 = new AWS.DynamoDB.DocumentClient();
var params123 = {
  TableName: 'socialegg',
  Item: {
      "email":document.cookie.replace('email=',''),
      "topics": {}
  },
}
var params1234 = {
  TableName: 'socialegg',
  Key: {
      "email":document.cookie.replace('email=',''),
  },
}
docClient1234.query(params1234, function(err, data) {
  if (err) {
      // //console.log(err);
  } else {
  // //console.log(data)
  if(data=={}){
    docClient123.put(params123, function(err, data) {
      if (err) {
          // //console.log(err);
          
      } else {
      //  window.alert('A link has been sent to verify your email. Verify your email for logging in');
      //  setActive(false);
      //  CloseModal();
      //console.log(data)
      }
    });
  }
  }
});

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


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




const SubscribeScreen = ({ GoogleToken }) => {

  const classes = useStyles();

  const [active, setActive] = useState(false);

  const alert = useAlert()

//   const [googletoken, setGoogleToken] = useState("None");

  const [freq, setFreq] = useState('');

  const [email, setEmail] = useState('');

  const [emapp, setEmapp] = useState('');

  const [keywords, setKeywords] = useState('');

  

  const HandleFreq = (event) => {
        setFreq(event.target.value);
  }

  const HandleEmapp = (event) => {
    setEmapp(event.target.value);
    // //console.log(emapp);
  }

  const HandleEmail = (event) => {
      setEmail(event.target.value);
  }

  const HandleKeywords = (event) => {
      setKeywords(event.target.value);
  }



    //media.js
  
    const [newssrc, setNewssrc] = useState({});
    const [sources, setSources] = useState([]);

    useEffect(() => {
      axios.get(
        "https://newsapi.org/v2/sources?apiKey=09c2791553a044108dc89d5d330bf780",
      ).then(res => {
        // //console.log(res.data.sources);
        setSources(res.data.sources);
      }).catch(err => {
        // //console.log(err);
      })
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);
    

    const obj = {};



    const listitems = [];

    let temp1, temp2;

    const HandleCheck = (e) => {
        setNewssrc({ ...newssrc, [e.target.value]: e.target.checked });
        // //console.log(newssrc);
    }



    const [chipstate,setChipstate] = useState(0);
    // const chpst = [];

    sources.forEach(source => {
      temp1 = source.id;
      obj[temp1] = false;
      listitems.push(<FormControlLabel onChange={HandleCheck}  control={<StyledMenuItem key={source.id}><Checkbox checked={newssrc[temp1] || false} value={source.id} name={source}  /><ListItemText primary={source.name} /></StyledMenuItem>}/>);
    });
    var i = 0;
    const handleClick = event => {
      setAnchorEl(event.currentTarget);

      if(chipstate == 0){
      setNewssrc(obj);
      setChipstate(1);
      }
      
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    var src = '';





    const SrcName = sources;

    var chips = [];

    var tmpp = {};
    const entries = Object.entries(newssrc);
    const handleDelete = (id) => {
      src = (src.replace(id, " "));
      tmpp = {...newssrc};
      tmpp[id] = 0;
      setNewssrc(tmpp);
      return src;
    }



    entries.filter((entry) => {
      if (entry[1])
      {
        SrcName.find((srcn) => {
            if(srcn["id"] == entry[0])
            {
              chips.push(<Chip label={srcn["name"]} onDelete={() => handleDelete(entry[0])} id={entry[0]} color="primary" style={{marginTop: 10}} />);
              return 0; 
            }
            else  return 0;
        })  
        src = src.concat(entry[0]);
        src = src.concat(', ');
        return 0;
      }
    })

    String(src);
    var d= new Date();
    var d2= new Date();
    d2.setHours(d2.getHours() - 48);
  let FormData = {
      "email": email,
      "topics": { topic : { "keywords": keywords, "frequency"  : parseInt(freq) ,"last_refresh" : d2.toISOString().split('.')[0] , "notifications" : emapp , "sources" : src ,"start_time" :  d.toISOString().split('.')[0] }},
  }

  const HandleSubmit = () => {
    var params = {
      TableName: config.tableName,
      Key:{ email : FormData.email },
        UpdateExpression: "SET topics.#keyword = :as",
        ExpressionAttributeNames: { "#keyword" : keywords },
        ExpressionAttributeValues :{ ":as" : { "frequency"  : parseInt(freq) ,"last_refresh" : d2.toISOString().split('.')[0] , "notifications" : emapp , "sources" : src ,"start_time" :  d.toISOString().split('.')[0] } },
        // ConditionExpression : "attribute_not_exists(topics.#keyword)"
    };
    var params5 = {
        TableName: config.tableName,
        Key:{ email : FormData.email },
        UpdateExpression: "PUT topics.#keyword = :as",
        ExpressionAttributeNames: { "#keyword" : keywords },
        ExpressionAttributeValues :{ ":as" : { "frequency"  : parseInt(freq) ,"last_refresh" : d.toISOString().split('.')[0] , "notifications" : emapp , "sources" : src ,"start_time" :  d.toISOString().split('.')[0] } },
        // ConditionExpression : "attribute_not_exists(topics.#keyword)"
        //  "#keywords" : keywords 
        //   ExpressionAttributeValues :{ ":as" : { "frequency"  : parseInt(freq) ,"last_refresh" : d.toISOString().split('.')[0] , "notifications" : emapp , "sources" : src ,"start_time" :  d.toISOString().split('.')[0] } },
      };
    if(email=='' || validEmailRegex.test(email)==false){
      // window.alert("Please enter a valid email-id");
      alert.show("Please enter a valid email-id");
    }
    else if(FormData.topics.topic.keywords==''){
      // window.alert("Please enter a topic");
      alert.show("Please enter a topic");
    }
    else if(FormData.topics.topic.frequency==''){
      // window.alert("Please choose a frequency");
      alert.show("Please choose a frequency");
    }
    else if(FormData.topics.topic.sources==''){
      // window.alert("Please choose the sources you'd like to hear from");
      alert.show("Please choose the sources you'd like to hear from");
    }
    else if(FormData.topics.topic.subscription==''){
        // window.alert("Please choose the sources you'd like to hear from");
        alert.show("Please select the type of subscription");
      }
    else{
        setActive(true);
        var params1 = {
            TableName: 'socialegg',
            Key:{
                "email": FormData.email
            }
        };
        
        let docClient1 = new AWS.DynamoDB.DocumentClient();
        docClient1.get(params1, function(err, data) {
            if (err) {
                // //console.log(err);
                setActive(false);
            } else {
                docClient.update(params, function(err, data) {
                    if (err) {
                        alert.show("There's an error within our servers. Please try again.");
                    } else {
                        alert.show("You've been successfully subscribed!");
                    }
                    setActive(false);
                });
        }
        });
}
  // setActive(false);
  }


  




  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  // var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return (
    <div className="App">
      <Navbar />
      <InitialDescription />
      <p>
        Note: Please put keywords related to a specific topic only. <br/>
        Ex: covid, coronavirus, India<CheckIcon style={{verticalAlign: 'bottom', color: 'green'}} /><br/>
        Ex: covid, football<ClearIcon style={{verticalAlign: 'bottom', color: 'red'}} />


      </p>
      <LoadingOverlay
        active={active}
        spinner
        // text='Loading your content...'
        style={{}}
        >
      <KeyWords keywords={keywords} HandleChange={HandleKeywords} />
      
      
      <div className = 'mainpage'>
            <p> 
                2. Choose your favorite news source(s)<hr id='line' style={{width:'250px', opacity:0.2}}></hr>
                <p>
                {chips}
                </p>
                <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    edge="start"

                    color="inherit"
                    aria-label="open drawer"
                    style={ { marginLeft : 0, flex: 0 } }
                >
                    <ArrowDropDownCircleIcon />
                </IconButton>
                <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <FormControl>
                  <FormGroup>
                    {listitems}
                  </FormGroup>
                </FormControl>
                </StyledMenu>
            </p>
        </div>
      <Frequency HandleChange={HandleFreq} frequency={freq} />
      <Email 
        emailid={email} 
        HandleChange={HandleEmail} 
        // error={true}
        helperText="Invalid Email" 
      />
      <p> 
          5. Choose the way(s) you want to receive news:<hr id='line' style={{width:'250px', opacity:0.2}}></hr>
      </p>
      <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Subscriptions</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={emapp}
          onChange={(e) => HandleEmapp(e)}
          >
          <MenuItem value='In-App'>In-App</MenuItem>
          <MenuItem value='Email'>Email</MenuItem>
          <MenuItem value='Both'>Both</MenuItem>
          </Select>
          
      </FormControl>
      
      <Submit GoogleToken={GoogleToken} onclick={HandleSubmit}  />
      </LoadingOverlay>
      <Footer />
    
    </div>
  );
}

export default SubscribeScreen;
