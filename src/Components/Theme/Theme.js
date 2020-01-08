import {createMuiTheme} from "@material-ui/core/styles";

export default createMuiTheme({
    palette: {
        primary: {
            light: '#576E62',
            main: '#526C5E',
            dark: '#506258',
            contrastText: '#86906E',
        },
        secondary: {
            light: '#8A9374',
            main: '#86906E',
            dark: '#7B826A',
            contrastText: '#4C525C',
        },
        error:{
            light: '#9C827B',
            main: '#997D74',
            dark: '#8A7771',
            contrastText: '#545B67',
        },
        accent: {
            light: '#545B67',
            main: '#4F5865',
            dark: '#4C525C',
            contrastText: '#9C827B',
        },
        background: {
            default: '#8A9374',
            paper: '#7B826A'
        },
    },
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: '#4C525C',
            },
        },
        MuiButton: {
            root: {
                margin: 4,
            },
        },
        MuiInputLabel: {
            root: {
                color: '#86906E',
                padding: 4,
                '&:$focused': {
                    color: '#8A9374',
                },
            },
        },
        MuiFormControl: {
            root: {
                background: '#506258',
                borderRadius: 4,
                margin: 4,
                marginTop: 1,
                padding: 4,
            },
        },
        MuiInput: {
            root: {
                width: 150,
                color: '#86906E',
            },
            underline: {
                '&:before': {
                    borderBottom: '1px solid #86906E',
                },
                '&:hover:not($disabled):before': {
                    borderBottom: '1px solid #8A9374',
                },
            },
        },

    },
});