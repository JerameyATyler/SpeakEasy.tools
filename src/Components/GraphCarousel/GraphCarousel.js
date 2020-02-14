import React, {useState} from "react";
import {makeStyles, Toolbar} from "@material-ui/core";
import {Theme} from "../Theme";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PrevIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import GetSamples from "../../Views/ToneTrainer/GetSamples";
import {ToneGraph} from "../../Visualizations";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        width: 1200,
        height: 700,
    },
    title: {

        flexGrow: 1
    },
    buttonBar: {
        display: 'flex',
        justifyContent: 'center'
    },
    leftButtons: {
        flexGrow: 1
    },
    rightButtons: {
        flexGrow: -1
    },
}));

export default () => {
    const classes = useStyles(Theme);

    const [activeStep, setActiveStep] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const handleNextStep = () => {
        setActiveStep(prevState => prevState + 1);
    };
    const handlePrevStep = () => {
        setActiveStep(prevState => prevState - 1);
    };
    const handleNextPage = () => {
        setActivePage(prevState => prevState + 1);
    };
    const handlePrevPage = () => {
        setActivePage(prevState => prevState - 1);
    };

    const samples = GetSamples({page: activePage});
    const stepLimit = 5;
    const pageLimit = samples? Math.ceil(samples.totalSamples / stepLimit): activePage;
    return (
        <div className={clsx(classes.root)}>
            <AppBar position='static' color='primary'>
                <Toolbar>
                    <div className={clsx(classes.leftButtons)}>
                        <IconButton
                            edge='start'
                            color='secondary'
                            onClick={handlePrevPage}
                            disabled={activePage <= 0}
                        >
                            <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                        </IconButton>
                        <IconButton
                            edge='start'
                            color='secondary'
                            onClick={handlePrevStep}
                            disabled={activeStep <= 0}
                        >
                            <PrevIcon/>
                        </IconButton>
                    </div>
                    <div className={clsx(classes.title)}>
                        <Typography
                            variant='h6'
                            color='secondary'
                        >
                            {samples && samples.samples[activeStep].graphemes}
                        </Typography>
                    </div>
                    <div className={clsx(classes.title)}>
                        <Typography
                            variant='h4'
                            color='secondary'
                        >
                            {samples && samples.samples[activeStep].pinyin}
                        </Typography>
                    </div>
                    <div className={clsx(classes.title)}>
                        <Typography
                            variant='h6'
                            color='secondary'
                        >
                            {samples && samples.samples[activeStep].english}
                        </Typography>
                    </div>
                    <div className={clsx(classes.rightButtons)}>
                        <IconButton
                            edge='end'
                            color='secondary'
                            onClick={handleNextStep}
                            disabled={activeStep >= (stepLimit - 1)}
                        >
                            <NextIcon/>
                        </IconButton>
                        <IconButton
                            edge='end'
                            color='secondary'
                            onClick={handleNextPage}
                            disabled={activePage >= (pageLimit - 1)}
                        >
                            <FontAwesomeIcon icon={faAngleDoubleRight}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {samples && <ToneGraph s={samples.samples[activeStep]}/>}
        </div>
    )
}