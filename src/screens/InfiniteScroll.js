import React, { useState, useEffect, useReducer } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import AWS from 'aws-sdk';
import { useAlert } from 'react-alert';
import load from '../images/loading.gif'
import $ from 'jquery';
// Credentials Removed
AWS.config.update({
  region: config.region,
  endpoint: config.dynamodbEndpoint,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});
let docClient = new AWS.DynamoDB.DocumentClient();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '86vw',
    paddingTop: 150,
    paddingLeft: '7vw'
  },
  cardRoot: {
    // maxWidth: 345,
    boxShadow: "0px 12px 35px rgba(92, 141, 255, .22)",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


var topics = [];
var random ='';
var options = [];
var axiosurls = [];
var axiosurl = 'https://newsapi.org/v2/everything?q=';
var count = 0;
var cards = new Array();
var j = 0;
// for (var qwer=0;qwer<100;qwer++){
//   cards[qwer] = [];
// }
var articles = [];
var newArticles = [];
var newCards = new Array();
var urlToUse = '';
var cnt = 0;
var refreshtimes=[];
var sd = '';
var sourceslist =[];
var frequencies =[];
var starttimes=[];
var notificationslist = [];
const InfiniteScroll = () => {

    const alert = useAlert();

    const [news, setNews] = useState([]);

    const [newCardState, setNewCardState] = useState([]);

    const [newsCards, setNewsCards] = useState([]);
    // const [news, dispatch] = useReducer(newsReducer, []);

    
    const [subscription, setSubscription] = React.useState('');

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleSubscription = (event) => {
        setSubscription(event.target.value);
        setNews(articles);
        var xd = '.';
        var res = event.target.value.split(" ");
        res[0] = res[0].replace(',','');
        res[0] = res[0].replace('+','');
        res[0] = res[0].replace('-','');
        xd = xd.concat(res[0]);
        
        $('.MuiGrid-item').css('display', 'none');
        $(xd).css('display', 'block')
    };
    //MuiGrid-root https://newsapi.org/v2/everything?q=Amazon&apiKey=8238274e2c804ba7846c193f425ee6d3 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-lg-4
    var params = {
      TableName: config.tableName,
      Key: document.cookie.replace("email=", ""),
    };

    function axiosarray(axiosurls) {
      // //console.log(axiosurls);
    }
    var axioskeys = ['09c2791553a044108dc89d5d330bf780']
    const SelectSubscription = () =>{
      if(count==0){
    docClient.scan(params, function(err, data) {
      if (err) {
        //console.log(err);
    } else {
      for(var nmhj =0; nmhj<data['Items'].length; nmhj++){
        if(data['Items'][nmhj]['email']==document.cookie.replace("email=", "")){
          topics = data['Items'][nmhj]['topics'];
        }
      }
      var len =  Object.keys(topics).length;
      for (var i=0; i<len;i++){
        if(topics[Object.keys(topics)[i]]['notifications']=='In-App' || topics[Object.keys(topics)[i]]['notifications']=='Both' ){
        options.push(
          <MenuItem value={Object.keys(topics)[i]}>{Object.keys(topics)[i]}</MenuItem>
        )
        }
        }
      for ( j; j<len;j++){
        var key = Math.floor(Math.random() * (3 - 0));
        if(topics[Object.keys(topics)[j]]['notifications']=='In-App' || topics[Object.keys(topics)[j]]['notifications']=='Both' ){
        var date = new Date();
        var currentTime = date.toISOString().split('.')[0];
        // var date = new Date();
        // var currentTime = date.toISOString().split('.')[0];
        var lastRefreshTime = new Date();
        // //console.log(refreshtimes);
        // lastRefreshTime = refreshtimes[topicnow];
        // //console.log((lastRefreshTime));
        // refreshtimes[topicnow] = currentTime;
        lastRefreshTime.setHours(lastRefreshTime.getHours() - 100);
        // var lastRefreshTime = lastRefreshTime.toISOString().split('.')[0];
        refreshtimes[Object.keys(topics)[j]] = currentTime;
        sourceslist[Object.keys(topics)[j]] = topics[Object.keys(topics)[j]]['sources']
        frequencies[Object.keys(topics)[j]] = topics[Object.keys(topics)[j]]['frequency']
        starttimes[Object.keys(topics)[j]] = topics[Object.keys(topics)[j]]['start_time']
        notificationslist[Object.keys(topics)[j]] = topics[Object.keys(topics)[j]]['notifications']

        // //console.log(topics);
        axiosurls[j] = 'https://newsapi.org/v2/everything?q=';
        axiosurls[j] = axiosurls[j].concat(Object.keys(topics)[j]);
        random = topics[j];
        // //console.log(random);
        axiosurls[j]= axiosurls[j].concat('&apiKey=');
        axiosurls[j]= axiosurls[j].concat(axioskeys[key]);
        axiosurls[j]= axiosurls[j].concat('&from=');
        axiosurls[j]= axiosurls[j].concat(lastRefreshTime); 
        axiosurls[j]= axiosurls[j].concat('&to='); 
        var date = new Date();
        var currentTime = date.toISOString().split('.')[0];
        axiosurls[j]= axiosurls[j].concat(currentTime);
        axiosurls[j]= axiosurls[j].concat('&sources=');
        axiosurls[j]= axiosurls[j].concat(topics[Object.keys(topics)[j]]['sources']);  
        axiosurls[j]= axiosurls[j].concat('&language=en&pageSize=100');  
        axios.get(
          axiosurls[j],
      ).then(res => {
        // //console.log(res.config.url);
          articles = res.data.articles.reverse();
          // setNews([...news, articles], () => //console.log(news));
          // //console.log(res.data.articles)
          articles.forEach(article => {
            // res.config.url = res.config.url.replace("&apiKey=f26a1e6905ec48339bab25b53a04f8a7","");
            res.config.url = res.config.url.replace("https://newsapi.org/v2/everything?q=","");
            res.config.url = res.config.url.replace(/&apiKey=.*&language=en&pageSize=100/, '');
            res.config.url = res.config.url.replace(',', '');
            res.config.url = res.config.url.replace('+', '');
            res.config.url = res.config.url.replace('-', '');
            // //console.log(res.config.url )
            urlToUse = res.config.url;
              cards.push(<Grid style={{display:'none'}} className={res.config.url} item xs={12} sm={6} lg={4}><Card className={classes.cardRoot}><CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar}>{article.source.name[0]}</Avatar>} title={article.source.name} subheader={article.author} /><a alt='Image not available' target="_blank" style={{textDecoration:'none'}} href={article.url}><CardMedia className={classes.media} image={article.urlToImage} title={article.name} /><CardContent><Typography variant="body2" color="textSecondary" component="p">{article.title}</Typography></CardContent></a></Card></Grid>);
          })
      }).catch(err => {
          // //console.log(err);
      })
    }
      }
      axiosarray(axiosurls);
    }
});
count = count+1;
}
return(
  options
)
}

var topicnow = '';
const GetMore = () =>{
  if(cnt == 0)
  $(`<img src=${load} id="load" style="height: 50px"/>`).insertAfter("#loader");

  var helowef = Object.keys(topics).length;
  for (var qwsd = 0; qwsd<helowef;qwsd++){
    var xdz = '.';
    var res1 = Object.keys(topics)[qwsd].split(" ");
    res1[0] = res1[0].replace(',',''); 
    res1[0] = res1[0].replace('+',''); 
    res1[0] = res1[0].replace('-',''); 
    xdz = xdz.concat(res1[0]);
    if($(xdz).css('display')=='block'){
       topicnow =  Object.keys(topics)[qwsd];
    }
  }

  // //console.log(topicnow);
  var date = new Date();
var currentTime = date.toISOString().split('.')[0];
var lastRefreshTime = new Date();
// //console.log(refreshtimes);
lastRefreshTime = refreshtimes[topicnow];
// //console.log((lastRefreshTime));
refreshtimes[topicnow] = currentTime;
// lastRefreshTime.setHours(lastRefreshTime.getHours() - 12)//will get it from database
// var lastRefreshTime = lastRefreshTime.toISOString().split('.')[0];
var params = {
  TableName: 'socialegg',
  Key:{ email : document.cookie.replace('email=','') },
    UpdateExpression: "SET topics.#keyword = :as",
    ExpressionAttributeNames: { "#keyword" : topicnow },
    ExpressionAttributeValues :{ ":as" : { "frequency"  : parseInt(frequencies[topicnow]) ,"last_refresh" : currentTime , "notifications" : notificationslist[topicnow] , "sources" : sourceslist[topicnow] ,"start_time" :  starttimes[topicnow] } },
    // ConditionExpression : "attribute_not_exists(topics.#keyword)"
};
docClient.update(params, function(err, data) {
  if (err) {
      // alert.show("There's an error within our servers. Please try again.");
  } else {
      // alert.show("You've been successfully subscribed!");
  }
});
var key = Math.floor(Math.random() * (3 - 0));
var url = 'https://newsapi.org/v2/everything?q=';
url = url.concat(topicnow);
url = url.concat('&from=');
url = url.concat(lastRefreshTime);
url = url.concat('&to=');
url = url.concat(currentTime);
url = url.concat('&language=en&apiKey=');
url = url.concat(axioskeys[key]);
url = url.concat('&sources=');
url = url.concat(sourceslist[topicnow]);

  axios.get(
    url
).then(res => {
    newArticles = res.data.articles.reverse();
    setNews([...newArticles, ...news]);
}).catch(err => {
    //console.log(err);
})
  if(cnt == 0){
    cnt++;
    setTimeout(() => {
    document.getElementById("submit-button").click();
    }, 2000);
  }
  else
  {
  // //console.log(news);
  // //console.log(articles);
  // var xy = String(topicnow).replace(".", "");
  // //console.log(newArticles);
  if(newArticles.length == 0) alert.show('Your feed is already up to date');
  for(var i = 0; i < newArticles.length; i++){
    // $('#new-articles').append(String(<Grid style={{display:'none'}} className={urlToUse} item xs={12} sm={6} lg={4}><Card className={classes.cardRoot}><CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar}>{news[i].source.name[0]}</Avatar>} title={news[i].source.name} subheader={news[i].author} /><a alt='Image not available' style={{textDecoration:'none'}} href={news[i].url}><CardMedia className={classes.media} image={news[i].urlToImage} title={news[i].name} /><CardContent><Typography variant="body2" color="textSecondary" component="p">{news[i].title}</Typography></CardContent></a></Card></Grid>))
    newCards.push(<Grid style={{}} className={topicnow}  item xs={12} sm={6} lg={4}><Card className={classes.cardRoot}><CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar}>{news[i].source.name[0]}</Avatar>} title={news[i].source.name} subheader={news[i].author} /><a alt='Image not available' target="_blank" style={{textDecoration:'none'}} href={news[i].url}><CardMedia className={classes.media} image={news[i].urlToImage} title={news[i].name} /><CardContent><Typography variant="body2" color="textSecondary" component="p">{news[i].title}</Typography></CardContent></a></Card></Grid>);
  }

  // //console.log(newCards);
  // $('#refreshedNews').css('display', 'none !important');
  setNewCardState([...newCardState, ...newCards] );
  // $('.MuiGrid-item').css('display', 'none');
  newCards = [];
  cnt = 0;
  $('#load').remove();
  }
} 

  const isVerified = () => {
    if(document.cookie.replace("email=", "") == "") {
      return (
        <div style={{minHeight: 400}}>
          Please Login to continue.
        </div>
      )
    }
    else {
      return (
                <div>
                    <FormControl className={classes.margin}>
                        <label> Select Subscription</label>
                        <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={subscription}
                        label="Select Subscription "
                        onChange={handleSubscription}
                        input={<BootstrapInput />}
                        >
                          {SelectSubscription()}
                        </Select>
                        {(SelectSubscription().length != 0)  ? '' : <p>You currently don't have any subscriptions. Go to Subscribe Screen and make your first subscription</p>}
                    </FormControl>
                </div>
      )
    }
  }

// //console.log(news);
    

    return (
        <div className='App' >
            <Navbar />
            <div>
            </div>
            <div className={classes.root}>

                {isVerified()}
                
                {(document.cookie.replace("email=", "") == "") ? '': <Button variant="contained" id="submit-button" style={{background:'#0065A4',color:'#e3e3e3', marginBottom: 50, marginTop: 50}} onClick={GetMore}>Refresh Feed</Button>}
                <br id='loader' />
                {/* {cardsfunction()} */}
                <Grid container spacing={3} id="new-articles">
                {newCardState}
                </Grid>
                <Grid container spacing={3}>
                {cards}
                </Grid>
            </div>
            <Footer />
        </div>
    );
}

export default InfiniteScroll;