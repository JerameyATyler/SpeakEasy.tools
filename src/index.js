import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {MuiThemeProvider} from "@material-ui/core";

import {Auth0Provider} from "./react-auth0-spa";
import {history, Theme, serviceWorker} from "./utils";
import App from "./App";
import config from "./config";

/*
* This function handles the redirect that occurs after the authentication service returns.
*/
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
        ? appState.targetUrl
            : window.location.pathname
    );
};

/*
* This function returns a React Router component for our application. There is a Router wrapper that handles application
* routing, there is an Auth0Provider which handles user authentication, and there is a MuiThemeProvider which handles
* UI theme management.
*/
const mainRoutes = (
    <Router history={history}>
        <Auth0Provider
            domain={config.AUTH0_DOMAIN}
            client_id={config.AUTH0_CLIENT_ID}
            redirect_uri={window.location.origin}
            audience={config.AUTH0_AUDIENCE}
            onRedirectCallback={onRedirectCallback}
        >
            <MuiThemeProvider theme={Theme}>
                <App/>
            </MuiThemeProvider>
        </Auth0Provider>
    </Router>
);

/* Apply our React app to the DOM */
ReactDOM.render(mainRoutes, document.getElementById('root'));
/* Boilerplate code. */
serviceWorker.unregister();
