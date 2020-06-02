import React from "react";
import {NavLink, Route} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Theme} from "../../utils";

export default () => {
    return (
        <Route path='/:path' component={BreadcrumbItem}/>
    );
};

const BreadcrumbItem = ({match}) => {
    return (
        <NavLink to={match.url || ''}
                 activeStyle={{
                     fontWeight: 'bold',
                     color: Theme.palette.secondary.contrastText
                 }}
                 style={{
                     color: Theme.palette.secondary.contrastText
                 }}>
            <Typography
                align='center'
            >
                {match.url.toUpperCase()}
            </Typography>
            <Route path={`${match.url}/:path`} component={BreadcrumbItem}/>
        </NavLink>
    );
}