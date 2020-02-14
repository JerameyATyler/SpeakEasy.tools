import React, {Fragment} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GraphCarousel, Theme} from "../../Components";
import {GameWrapper} from "../../Components/GameWrapper";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {},
}));


export default () => {
    const classes = useStyles(Theme);

    const ToneTrainerComponent = () => {
        return (
            <div className={clsx(classes.root)}>
                <GraphCarousel/>
            </div>
        );
    };

    return (
        <GameWrapper>
            <Fragment/>
            <Fragment/>
            <ToneTrainerComponent/>
        </GameWrapper>
    );
};
