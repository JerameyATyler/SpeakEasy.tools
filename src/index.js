import ReactDOM from "react-dom";
import React from "react";
import {Router} from "react-router-dom";

import "./utils/index.css";

import {Auth0Provider} from "./react-auth0-spa";
import history from "./utils/history";
import config from "./config";
import App from "./App";
import {MuiThemeProvider} from "@material-ui/core";
import {Theme} from "./Components/Theme";

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

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

ReactDOM.render(mainRoutes, document.getElementById("root"));