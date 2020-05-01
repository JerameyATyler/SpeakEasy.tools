import {createMuiTheme} from "@material-ui/core/styles";
/*
* This file sets up the default values for the theme manager. Theme managers allow you to enforce styling across your
* application. This theme is intended to be used by Material UI components. Material UI is a library of user interface
* components built and maintained by Google. By using their theme manager and components when applicable a lot of
* styling happens auto-magically. Below I create a grayscale color palette with primary and secondary swatches. Each
* swatch has a main, light, and dark version as well as a contrastText value which specifies what color text should be.
* There is also an error swatch that is a red scale for warnings, errors, etc..
*
*/
export default createMuiTheme({
    palette: {
        primary: {
            light: '#d0d0e0',
            main: '#b0b0c0',
            dark: '#9090a0',
            contrastText: '#000010',
        },
        secondary: {
            light: '#606070',
            main: '#404050',
            dark: '#202030',
            contrastText: '#eeeefe',
        },
        error:{
            light: '#D27770',
            main: '#A74840',
            dark: '#832922',
            contrastText: '#ffffff',
        },
        background: {
            default: '#b0b0c0',
            paper: '#9090a0',
        },
    },
    /*
    * The section below will let you override the styling of Material UI components. You really only need this for
    * components that have multiple components, like Inputs and Buttons and only when you want to change the default
    * behavior.
    */
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: '#d0d0e0',
                color: '#000010',
                borderRadius: '10px'
            }
        }
    },
});