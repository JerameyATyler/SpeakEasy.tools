import React from "react";
import {Route} from 'react-router';
import {
    _2048,
    About,
    Configs,
    Contact,
    Dictionary,
    EyeSpy,
    FAQ,
    FlashCards,
    Help,
    Home,
    Instructor,
    Jeopardy,
    Kakuro,
    Memory,
    PopQuiz,
    Profile,
    SimonSays,
    Sudoku,
    TileSlider,
    TimeSeries,
    ToneTrainer,
    TotD,
    Uno,
    WoF
} from '../Views';

/*
* This file populates your router. Import a view, add it to the routes, and it will be available in the router.
*/

const routes = [
    {path: '/', name: 'Home', component: Home, exact: true},
    {path: '/2048', name: '2048', component: _2048},
    {path: '/eyespy', name: 'EyeSpy', component: EyeSpy},
    {path: '/jeopardy', name: 'Jeopardy', component: Jeopardy},
    {path: '/kakuro', name: 'Kakuro', component: Kakuro},
    {path: '/memory', name: 'Memory', component: Memory},
    {path: '/simonsays', name: 'Simon Says', component: SimonSays},
    {path: '/sudoku', name: 'Sudoku', component: Sudoku},
    {path: '/tileslider', name: 'Tile Slider', component: TileSlider},
    {path: '/totd', name: 'Typing of the Dead', component: TotD},
    {path: '/uno', name: 'Uno', component: Uno},
    {path: '/wof', name: 'Wheel of Fortune', component: WoF},
    {path: '/about', name: 'About', component: About},
    {path: '/contact', name: 'Contact', component: Contact},
    {path: '/faq', name: 'FAQ', component: FAQ},
    {path: '/help', name: 'Help', component: Help},
    {path: '/home', name: 'Home', component: Home},
    {path: '/instructor', name: 'Instructor', component: Instructor},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/dictionary', name: 'Dictionary', component: Dictionary},
    {path: '/flashcards', name: 'Flash Cards', component: FlashCards},
    {path: '/popquiz', name: 'Pop Quiz', component: PopQuiz},
    {path: '/timeseries', name: 'Time Series', component: TimeSeries},
    {path: '/tonetrainer', name: 'Tone Trainer', component: ToneTrainer}
];

const devRoutes = [
    {path: '/configs', name: 'Manage Configs', component: Configs}
];

const getRoutes = () => {
    if (process.env.NODE_ENV === 'production') return routes;
    else return [...routes].concat([...devRoutes])
};

export default () => getRoutes().map((route, index) => {
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