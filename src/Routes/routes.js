import React from "react";
import {Admin} from "../Views/Admin";
import {PopQuiz} from "../Views/PopQuiz";
import Profile from "../Views/Profile/Profile";
import {TwentyFortyEight} from "../Views/2048";
import {FlashCards} from "../Views/FlashCards";
import {Route} from "react-router";
import Home from '../Views/Home/Home';
import {Memory} from "../Views/Memory";

const routes = [
    {path: '/', name: "Home", component: Home, exact:true},
    {path: '/home', name: "Home", component: Home},
    {path: '/profile', name: 'Profile', component: Profile},
    //{path: '/progress', name: 'Progress', component: Progress},
    {path: '/admin', name: 'Admin', component: Admin},
    {path: '/memory', name: 'Memory', component: Memory},
    {path: '/flashCards', name: 'Flash Cards', component: FlashCards},
    {path: '/popQuiz', name: 'Pop Quiz', component: PopQuiz},
    {path: '/2048', name: '2048', component: TwentyFortyEight},
    //{path: '/toneTrainer', name: 'Tone Trainer', component: ToneTrainer},
    //{path: '/callback', name: 'Call Back', component: Callback}
];

export const MakeRoutes = routes.map((route, index) => {
    return (
        <Route
            key={index}
            path={route.path}
            render={props => (
                <route.component {...props}/>
            )}
            exact={route.exact? route.exact: false}
        />
    );
});