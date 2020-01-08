import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../../Components";
import clsx from "clsx";

import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: "60vw",
    },
    active: {
        visibility: 'visible'
    },
    inactive:{
        visibility: 'collapse',
    },
    wordsTab:{}
}));

export default (props) => {
    const classes = useStyles(Theme);
    const words = props.words;

    const handleCategoryTabChange = (event, newValue) => {
        props.setCategoryTab(newValue);
    };
    const handleWordTabChange = (event, newValue) => {
        props.setWordTab(newValue);
    };

    return (
        <div className={clsx(classes.root)}>
            <Tabs
                value={props.categoryTab}
                onChange={handleCategoryTabChange}
                >
                {words.map((category, index) => (
                    <Tab label={index} key={index}/>
                    ))}
            </Tabs>
            {words.map((category, index) => (
                <Tabs className={clsx(classes.wordsTab, {
                    [classes.active]: props.categoryTab===index,
                    [classes.inactive]: props.categoryTab !==index
                })}
                      value={props.wordTab}
                      onChange={handleWordTabChange}
                      variant='scrollable'
                      key={index}
                >
                    {category.map((word, indx) => (
                        <Tab label={word.english} key={indx}/>
                    ))}
                </Tabs>
            ))}
        </div>
    );
};
