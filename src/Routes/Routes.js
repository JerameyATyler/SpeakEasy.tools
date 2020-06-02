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
    Simon,
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

export const LANDING = {path: '/', name: 'Home', component: Home, exact: true};
export const HOME = {path: '/home', name: 'HOME', component: Home};
export const INSTRUCTOR = {path: '/instructor', name: 'Instructor', component: Instructor};

export const T48 = {path: '/2048', name: '2048', component: _2048};
export const EYE_SPY = {path: '/eye_spy', name: 'Eye Spy', component: EyeSpy};
export const JEOPARDY = {path: '/jeopardy', name: 'Jeopardy', component: Jeopardy};
export const KAKURO = {path: '/kakuro', name: 'Kakuro', component: Kakuro};
export const MEMORY = {path: '/memory', name: 'Memory', component: Memory};
export const SIMON = {path: '/simon', name: 'Simon', component: Simon};
export const SUDOKU = {path: '/sudoku', name: 'Sudoku', component: Sudoku};
export const TILE_SLIDER = {path: '/tile_slider', name: 'Tile Slider', component: TileSlider};
export const TD = {path: '/typing_of_the_dead', name: 'Typing of the Dead', component: TotD};
export const UNO = {path: '/uno', name: 'Uno', component: Uno};
export const WF = {path: '/wheel_of_fortune', name: 'Wheel of Fortune', component: WoF};

export const ABOUT = {path: '/about', name: 'About', component: About};
export const CONTACT = {path: '/contact', name: 'Contact', component: Contact};
export const FAQS = {path: '/faq', name: 'FAQ', component: FAQ};
export const HELP = {path: '/help', name: 'Help', component: Help};
export const PROFILE = {path: '/profile', name: 'Profile', component: Profile};
export const DICTIONARY = {path: '/dictionary', name: 'Dictionary', component: Dictionary};
export const FLASHCARDS = {path: '/flashcards', name: 'Flashcards', component: FlashCards};
export const POP_QUIZ = {path: '/pop_quiz', name: 'Pop Quiz', component: PopQuiz};
export const TIME_SERIES = {path: '/time_series', name: 'Time Series Analyzer', component: TimeSeries};
export const TONE_TRAINER = {path: '/tone_trainer', name: 'Tone Trainer', component: ToneTrainer};

export const CONFIGS = {path: '/configs', name: 'Module Configurations', component: Configs}

const routes = [
    LANDING,
    HOME,
    T48,
    EYE_SPY,
    JEOPARDY,
    KAKURO,
    MEMORY,
    SIMON,
    SUDOKU,
    TILE_SLIDER,
    TD,
    UNO,
    WF,
    ABOUT,
    CONTACT,
    FAQS,
    HELP,
    HOME,
    PROFILE,
    DICTIONARY,
    FLASHCARDS,
    POP_QUIZ,
    TIME_SERIES,
    TONE_TRAINER
];

const devRoutes = [
    CONFIGS
];
const adminRoutes = [
    INSTRUCTOR
];

export const Routes = userRole => {
    let newRoutes = [...routes];
    if (userRole === 'admin') {
        newRoutes = [...newRoutes].concat([...adminRoutes]);
    }
    if (process.env.NODE_ENV === 'production') return newRoutes;
    return [...newRoutes].concat([...devRoutes]);
};

export const BuildRoutes = userRole => Routes(userRole).map((route, index) => {
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
