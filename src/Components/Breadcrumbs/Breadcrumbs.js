import React from "react";
import {NavLink, Route} from "react-router-dom";
import {Typography} from "@material-ui/core";

export const Breadcrumbs = () => {
    return (
        <>
            <Route path='/:path' component={BreadcrumbItem}/>
        </>
    )
};

const BreadcrumbItem = ({match}) => (
    <>
        <NavLink to={match.url || ''}>
            <Typography
                variant='h4'
                color='secondary'
            >
                {match.url}</Typography>
            <Route path={`${match.url}/:path`} component={BreadcrumbItem}/>
        </NavLink>
    </>
);

