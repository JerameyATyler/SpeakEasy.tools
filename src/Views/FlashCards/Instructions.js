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
                Practice word recognition with flash cards.
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
                <em>Chinese/English - </em>
                Card front text is in Chinese, the back is in English
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Chinese/Pinyin - </em>
                Card front text is in Chinese, the back is in Pinyin
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Pinyin/English - </em>
                Card front text is in Pinyin, the back is in English
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                <em>Chaos - </em>
                Card front text and back text languages are randomly chosen
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
            >
                Shuffle
            </Typography>
            <Typography
                paragraph
                color='secondary'
            >
                Shuffles the order of the flash cards
            </Typography>
        </>
    )
};