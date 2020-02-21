import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import './index.css'

import {AppContextProvider} from "./Contexts/AppContext";

ReactDOM.render(
    <AppContextProvider value={{name: 'hello'}}>
        <Router>
            <App />
        </Router>
    </AppContextProvider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
