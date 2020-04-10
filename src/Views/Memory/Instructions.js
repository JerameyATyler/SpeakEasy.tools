import React from "react";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export default () => {
    return (
        <>
            <Typography
                variant='subtitle1'
                color='secondary'
                tabIndex='0'
            >
                Look for pairs of matching cards by flipping them over.
            </Typography>
            <Typography
                variant='h6'
                color='secondary'
                tabIndex='0'
            >
                1. Select Game Mode
            </Typography>
            <Divider/>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                <em>Chinese - </em>
                Card text is in Chinese
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                <em>Pinyin - </em>
                Card text is in Pinyin
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                <em>English - </em>
                Card text is in English
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                <em>Hybrid - </em>
                Card text is in Chinese,
                Pinyin, and English
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                <em>Chaos - </em>
                Card text changes language every time
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
                tabIndex='0'
            >
                2. Select board size
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                Determines how many cards will be on the board
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
                tabIndex='0'
            >
                3. Load Board
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                Uses the current options to render a game board
            </Typography>
        </>
    )
};