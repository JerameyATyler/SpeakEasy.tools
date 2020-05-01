import React from "react";
import {Route} from 'react-router';
import {_2048, Instructor, Dictionary,EyeSpy, Home, Memory, PopQuiz, Profile, TimeSeries, ToneTrainer} from '../Views';

/*
* This file populates your router. Import a view, add it to the routes, and it will be available in the router.
*/

const routes = [
    {path: '/', name: 'Home', component: Home, exact: true},
    {path: '/2048', name: '2048', component: _2048},
    {path: '/instructor', name: 'Instructor', component: Instructor},
    {path: '/dictionary', name: 'Dictionary', component: Dictionary},
    {path: '/eyespy', name: 'EyeSpy', component: EyeSpy},
    {path: '/home', name: 'Home', component: Home},
    {path: '/memory', name: 'Memory', component: Memory},
    {path: '/popquiz', name: 'Pop Quiz', component: PopQuiz},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/timeseries', name: 'Time Series', component: TimeSeries},
    {path: '/tonetrainer', name: 'Tone Trainer', component: ToneTrainer}
];

export default () => routes.map((route, index) => {
    return (
        <Route
            key={index}
            path={route.path}
            render={props => (
                <route.component {...props}/>
            )}
            exact={route.exact}
        />
    );
});