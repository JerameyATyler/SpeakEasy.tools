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
                Look for pairs of matching cards by flipping them over.
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
                Card text is in Chinese
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Pinyin - </em>
                Card text is in Pinyin
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>English - </em>
                Card text is in English
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Hybrid - </em>
                Card text is in Chinese,
                Pinyin, and English
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Chaos - </em>
                Card text changes language every time
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
            >
                2. Select board size
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                Determines how many cards will be on the board
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
            >
                3. Load Board
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                Uses the current options to render a game board
            </Typography>
        </>
    )
};