import React, {useState} from 'react';
import {makeStyles, MobileStepper} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import SwipeableViews from 'react-swipeable-views';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {NativeQuickView} from "../../Components/NativeQuickView";


const useStyles = makeStyles(theme => ({
    root: {
        width: 900,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceAround',
        backgroundColor: theme.palette.primary.main,
    },
    viewer: {},
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceAround',
    },
}));

export default ({natives}) => {
    const classes = useStyles(Theme);
    const [page, setPage] = useState(0);
    const maxPages = natives.length;

    const nextPage = () => {
        setPage(prevState => prevState + 1);
    };

    const prevPage = () => {
        setPage(prevState => prevState - 1);
    };

    const handlePageChange = newPage => {
        setPage(newPage);
    };

    return (
        <div
            className={clsx(classes.root)}
        >
            <SwipeableViews
                axis='x'
                index={page}
                onChangeIndex={handlePageChange}
                enableMouseEvents
            >
                {natives ? natives.map((native, index) => (
                    <div key={native.id}>
                        {Math.abs(page - index) <= 2 ?
                            <NativeQuickView
                                native={native}
                            />
                            :
                            null}
                    </div>
                )) : <div/>}
            </SwipeableViews>
            <MobileStepper
                steps={maxPages}
                position='static'
                variant='text'
                activeStep={page}
                nextButton={
                    <Button size='small' onClick={nextPage} disabled={page === maxPages - 1}>
                        Next
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={prevPage} disabled={page === 0}>
                        Prev
                        <KeyboardArrowLeft/>
                    </Button>}
            />
        </div>
    )
}