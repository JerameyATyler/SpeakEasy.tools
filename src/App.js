import React, {useState} from "react";
import jwt from 'jsonwebtoken';

import {/*Footer,*/ Header, LeftDrawer, Theme} from "./Components";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

import { useAuth0 } from "./react-auth0-spa";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {setContext} from "apollo-link-context";
import {CssBaseline, makeStyles} from "@material-ui/core";
import clsx from "clsx";
import {Switch} from "react-router";
import {MakeRoutes} from "./Routes/routes";
import {GRAPHQL_URL} from "./utils/constants";
import {Construction} from "./Components/Construction";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App ()  {
    const classes = useStyles(Theme);

    const [accessToken, setAccessToken] = useState('');
    const {getTokenSilently, loading} = useAuth0();
    const [userRole, setUserRole] = useState('anonymous');
    const [open, setOpen] = useState(false);

    if(loading) {
        return <p>Loading...</p>;
    }

    const getAccessToken = async () => {
        try {
            const token = await getTokenSilently();
            const role = await jwt.decode(token)['https://hasura.io/jwt/claims']['x-hasura-default-role'];
            setAccessToken(token);
            setUserRole(role);
        }catch (e) {
            console.log(e);
        }
    };
    getAccessToken();

    const httpLink = new HttpLink({
        uri: GRAPHQL_URL,
    });

    const authLink = setContext((_, {headers}) => {
        if(accessToken){
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${accessToken}`,
                }
            };
        }else {
            return {
                headers: {
                    ...headers
                }
            };
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <div className={clsx(classes.root)}>
                <CssBaseline/>
                <LeftDrawer open={open} setOpen={() => setOpen(!open)}/>
                <div className={clsx(classes.content)}>
                    <div className={clsx(classes.toolbar)}/>
                    <Switch>
                        {MakeRoutes}
                    </Switch>
                </div>
                <Header userRole={userRole}/>
                <Construction/>
                {/* <Footer/> */}
            </div>
        </ApolloProvider>
    )
}
export default App;