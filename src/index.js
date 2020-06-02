import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {MuiThemeProvider} from "@material-ui/core";
import {history, Theme, serviceWorker} from "./utils";
import App from "./App";
import {ProvideAuth} from "./Firebase/FirebaseAuth";

/*
* This function returns a React Router component for our application. There is a Router wrapper that handles application
* routing, there is an Auth0Provider which handles user authentication, and there is a MuiThemeProvider which handles
* UI theme management.
*/
const mainRoutes = (
    <Router history={history}>
            <MuiThemeProvider theme={Theme}>
                <ProvideAuth>
                <App/>
                </ProvideAuth>
            </MuiThemeProvider>
    </Router>
);

/* Apply our React app to the DOM */
ReactDOM.render(mainRoutes, document.getElementById('root'));
/* Boilerplate code. */
serviceWorker.unregister();
