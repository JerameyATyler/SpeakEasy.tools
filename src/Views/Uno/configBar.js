// These are our import statements, they give us access to different libraries
import React, { // React gives us the React component functionality, this allows us to make small modules of code
    useState // useState allows us to manage the state of this module, this helps us update when new data arrives
} from 'react'; // React.js is a JavaScript library for creating reusable code modules called Components
import {
    makeStyles, // This lets use a style sheet for this component that uses our global theme
    Menu, // A UI menu
    MenuItem, // A UI menu item
    Button, // A UI button, by using the Material-ui implementation of a button we can apply our global style easily
    FormControl, // A container for form elements
    FormControlLabel, // A label for a form control
    FormLabel, // A label for a form element
    Radio, // A radio button.
    RadioGroup, // A group of radio buttons. Only one radio button can be selected at a time
} from "@material-ui/core"; // Material-ui is a Google library for creating user interfaces with a standard design
import {Theme} from "../../Components/Theme"; // The global style for the application
import clsx from "clsx"; // This library helps us keep our class names from affecting other components that might use the same names

// This creates our style sheet for this component
const useStyles = makeStyles(theme => ({
    root:{ // Here we can write our CSS classes that we'll use for this component
    }, // We can have as many classes as we want
    formControl: { // This class styles the form inside of our menu
        margin: theme.spacing(3), // Using the global style, add 3 units of padding on each side before our content
        backgroundColor: theme.palette.accent.light, // Using the global color palette, set the background to the light version of our accent color
        color: theme.palette.primary.contrastText, // Using the global color palette, set the text color to the primary text color
    },
    formLabel: { // The form text
        color: theme.palette.primary.contrastText, // Set to global primary text color
    }
}));

// This is what gets returned. Anything that can be updated needs to be inside. This type
// of React component is called a 'Hook'.
export default (props) => { // Props are properties and these are passed into components like variables
    // This takes the global style and applies it to our CSS
    const classes = useStyles(Theme);
    /*
    // This places a reference on the screen for where the menu should open.
    // We are using useState here because we need to update the screen when the
    // users clicks the button. Our component has a state that determines what
    // is on the screen. New data or actions from the user can change that state
    // but for a variable to control the component's state it needs to be created
    // with useState. Anytime the state changes the screen will update, so use it
    // carefully.
    */
    const [anchorE1, setAnchorE1] = useState(null);

    // This handles what happens when the user clicks the menu button
    const handleClick = event => {
        // Set the menu's anchor to the spot where the user clicked
        setAnchorE1(event.currentTarget);
    };

    // This handles what happens when the menu closes
    const handleClose = () => {
        // We set the anchor to null so that the menu can close
        setAnchorE1(null);
    };

    return (
        <div> {/* When you return, you must always return a single container wrapping everything else */}
            <Button
                variant='contained'
                color='secondary'
                aria-controls='my menu'
                aria-haspopup='true'
                onClick={handleClick}
                >
                My Menu {/* This is the actual text that is on the button */}
            </Button>
            <Menu
                id='my_menu'
                anchorEl={anchorE1}
                keepMounted
                open={Boolean(anchorE1)}
                onClose={handleClose}
                >
                <FormControl
                    component='fieldset'
                    className={clsx(classes.formControl)}
                >
                    <FormLabel
                        className={clsx(classes.formLabel)}
                        component='legend'
                    >
                        My Options {/* Label text */}
                    </FormLabel>
                    <RadioGroup
                        aria-label='my-options'
                        name='my-options'
                        value={props.options}
                        onChange={e => props.setOptions(e.target.value)}
                        >
                        <FormControlLabel
                            control={<Radio/>}
                            label='Option 1'
                            value='Option 1'
                        >
                            <MenuItem/> {/* This shapes our form control label and radio button into a menu item */}
                        </FormControlLabel>
                        <FormControlLabel
                            control={<Radio/>}
                            label='Option 2'
                            value='Option 2'
                        >
                            <MenuItem/>
                        </FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Menu>
        </div>
    );
}