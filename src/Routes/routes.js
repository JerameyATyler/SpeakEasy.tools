import React from "react";
import {Route} from "react-router";

import {
    TwentyFortyEight,
    Admin,
    FlashCards,
    Home,
    Memory,
    PopQuiz,
    Profile,
    ToneTrainer,
    Uno,
    Tools
} from "../Views";

const routes = [
    {path: '/', name: "Home", component: Home, exact:true},
    {path: '/home', name: "Home", component: Home},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/admin', name: 'Admin', component: Admin},
    {path: '/memory', name: 'Memory', component: Memory},
    {path: '/flashcards', name: 'Flash Cards', component: FlashCards},
    {path: '/popQuiz', name: 'Pop Quiz', component: PopQuiz},
    {path: '/2048', name: '2048', component: TwentyFortyEight},
    {path: '/toneTrainer', name: 'Tone Trainer', component: ToneTrainer},
    {path: '/uno', name: 'Uno', component: Uno},
    {path: '/tools', name: 'Tools', component: Tools}
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