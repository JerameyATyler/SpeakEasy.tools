import React from "react";
import {makeStyles, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import {Theme} from "../../Components/Theme";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pad: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    }
}));

export default () => {
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Typography
                    variant='subtitle1'
                    color='secondary'
                    tabIndex='0'
                    aria-label='game description: Swipe to match up the tiles. Can you get 2048?'
                >
                    Swipe to match up the tiles. Can you get 2048?
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    variant='h6'
                    color='secondary'
                    tabIndex='0'
                    aria-label='game mode: 1. Select Game Mode'
                >
                    1. Select Game Mode
                </Typography>
            </div>
            <Divider/>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-label='Chinese description: Text is in Chinese'
                >
                    <em>Chinese - </em>
                    Text is in Chinese
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-label='Pinyin description: Text is in Pinyin'
                >
                    <em>Pinyin - </em>
                    Text is in Pinyin
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-label='English description: Text is in English'
                >
                    <em>English - </em>
                    Text is in English
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-label='adaptive description:Text starts in English but transitions to Chinese as you go'
                >
                    <em>Adaptive - </em>
                    Text starts in English but transitions to Chinese as you go
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-label='chaos description:Text changes language every time'
                >
                    <em>Chaos - </em>
                    Text changes language every time
                </Typography>
            </div>
            <div className={clsx(classes.pad)}>
                <Typography
                    paragraph
                    color='secondary'
                    tabIndex='0'
                    aria-labelledby='color only description: No text, just colors'
                >
                    <em>Color Only - </em>
                    No text, just colors
                </Typography>
            </div>
        </div>
    )
};