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
                tabIndex='0'
            >
                The first player to play all of the cards in their hand wins.
            </Typography>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >
                Setup: each player draws seven card from the pile.
            </Typography>
            <Divider/>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >	
            	Gameplay:
                The game starts by revealing the card at the top of the pile.
                The starter will try to match a card in his hand by color or number with the card revealed.
                If he cannot, then he must draw a card.  He can play the newly drawn card if able.
            	The next player repeats the process above. If the round ends with the last player not playing any card, he can play any card.
            </Typography>
            <Divider/>
            <Typography
                paragraph
                color='secondary'
                tabIndex='0'
            >	
            	Action cards are cards that have special functions, including forcing the next player to draw cards or skipping the next player.
            </Typography>
        </>
    )
};