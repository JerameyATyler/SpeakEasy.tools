import React from "react"; // React allows us to write reusable code modules
import {Typography} from "@material-ui/core"; // Typography components ensure that text always displays correctly
import Divider from "@material-ui/core/Divider"; // A simple line to separate visual content

export default () => {
    return (
        <> {/* This is called a React Fragment. It's an empty container for our components
        This lets us inherit our layout from the parent component */}
            <Typography
                variant='subtitle1'
                color='secondary'
            >
                How to play this game...
            </Typography>
            <Typography
                variant='h6'
                color='secondary'
            >
                1. Step one
            </Typography>
            <Divider/>
            <Typography
                variant='h6'
                color='secondary'
            >
                2. Step two
            </Typography>
        </>
    )
};