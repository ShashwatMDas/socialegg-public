import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { BrowserRouter, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
if (window.location.protocol !== 'https:' && !(window.location.href.includes('localhost'))) {
  window.location = 'https:' + window.location.href.substring(window.location.protocol.length)
}
//console.log(window.location.href);

const ProfileScreen = () => {
  return(
    <div>
      Profile Screen
    </div>
  )
} 


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
 

const routes =  (
  <BrowserRouter>
    <div>
      <Route path="" component={App} exact={true} />
      <Route path="/profile" component={ProfileScreen} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
