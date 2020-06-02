/*
* This file is your actual application.
*/

import React, {useEffect, useState} from 'react';
import {Switch} from "react-router";
import {ApolloClient} from "apollo-client";
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import {CssBaseline, makeStyles, Typography} from "@material-ui/core";
import clsx from 'clsx';

import {BuildRoutes} from "./Routes";
import {GRAPHQL_URL, Theme} from "./utils";
import {SideBar} from "./Components";
import {useAuth} from "./Firebase/FirebaseAuth";

/* This object sets up the CSS class names that will be used for this component. */
const useStyles = makeStyles(theme => ({
    /*
    * root is the highest level div/container in the application. Set width and height to 100% of the view width and
    * view height respectively. Set display to flex so children divs can behave responsively.
    */
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        overflow: 'hidden'
    },
    /*
    * The div that will hold our primary content. The flex property allows it to stretch and shrink with its parent.
    */
    content: {
        flex: '1 1 100%',
    },
    column: {}
}));

export default () => {
    /* Passes our Theme to the classes above, allowing us to access properties of the Theme like palette. */
    const classes = useStyles(Theme);

    const auth = useAuth();

    /* The user's access token. Lets them access data based on their role; admin, user, or anonymous. */
    const [accessToken, setAccessToken] = useState('');
    const [userRole, setUserRole] = useState('admin');

    /*
    * Fetch the token asynchronously so it doesn't lock loading of other visual elements. If it fails display
    * an error message in the console.
    */

    /* HTTP link to the GraphQL engine */
    const httpLink = new HttpLink({
        uri: GRAPHQL_URL,
    });
    /* Appends necessary headers to requests so that GraphQL engine can validate user access. */
    const authLink = setContext((_, {headers}) => {
        if (Boolean(accessToken)) {
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${accessToken}`,
                }
            };
        } else {
            return {
                headers: {
                    ...headers
                }
            };
        }
    });

    /* Set up the Apollo Client for querying the GraphQL engine */
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    useEffect(() => {
        if(!(auth && auth['token'])) return;
        setAccessToken(auth['token']);
    }, [auth]);

    /*
    * Apollo Provider wraps the application so that any page within the application will use the same Apollo Provider.
    * Outer div conforms to fill the view port. Inner div fills its parent. Switch handles changing the application's
    * content when you navigate to a page. All pages render within the Switch. Use root if you want to add things like
    * header, footer, or navigation menus so they don't occlude your main content. Use content for components you want
    * occupy the same space as your main content.
    */
    return (
        <ApolloProvider client={client}>

            <div className={clsx(classes.root)}>
                <CssBaseline/>
                <div className={clsx(classes.column)}>
                    <SideBar/>
                </div>
                <div className={clsx(classes.content)}>
                    <Switch>
                        {BuildRoutes(userRole)}
                    </Switch>
                </div>
            </div>

        </ApolloProvider>
    );
}