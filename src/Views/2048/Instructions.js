import React from "react";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export default () => {
    return (
        <>
            <Typography
                variant='subtitle1'
                color='secondary'
            >
                Swipe to match up the tiles. Can you get 2048?
            </Typography>
            <Typography
                variant='h6'
                color='secondary'
            >
                1. Select Game Mode
            </Typography>
            <Divider/>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Chinese - </em>
                Text is in Chinese
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Pinyin - </em>
                Text is in Pinyin
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>English - </em>
                Text is in English
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Adaptive - </em>
                Text starts in English but transitions to Chinese as you go
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Chaos - </em>
                Text changes language every time
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Color Only - </em>
                No text, just colors
            </Typography>
        </>
    )
};