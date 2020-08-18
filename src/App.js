import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { load } from 'recaptcha-v3';
import SubscribeScreen from './screens/SubscribeScreen';
import InfiniteScroll from './screens/InfiniteScroll';
import TeamScreen from './screens/TeamScreen';
import India from './covid/India';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

let tkn;

load('6LeDneQUAAAAAL9yp3IlNKE72B0b3sODs8v7c_q-').then((recaptcha) => {
  recaptcha.execute('login').then((token) => {
      // console.log(token) // Will print the token
      
    })
})
load('6LeDneQUAAAAAL9yp3IlNKE72B0b3sODs8v7c_q-', {
    useRecaptchaNet: true,
    autoHideBadge: false
  }).then((recaptcha) => {
    tkn = recaptcha;
  })

  
const App = () => {

  const [googletoken, setGoogleToken] = useState("None");

  setInterval(function(){
    setGoogleToken(tkn); 
    // console.log(googletoken); 
    }, 2000);
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <HomeScreen />
        </Route>
      </Switch>
      <Switch>
        <Route path="/covid/India" exact={true}>
          <India />
        </Route>
      </Switch>
      <Switch>
        <Route path="/profile" >
          <ProfileScreen GoogleToken={googletoken} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/infinity" >
          <InfiniteScroll />
        </Route>
      </Switch>
      <Switch>
        <Route path="/subscribe" >
          <SubscribeScreen />
        </Route>
      </Switch>
      <Switch>
        <Route path="/team" >
          <TeamScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
