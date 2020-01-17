import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';


export default (props) => {
    if(!props.data) return;
    console.log(props.data[0]);
    return (
        <VictoryChart>
            <VictoryBar
                data={props.data}
                x='x'
                y='y'
            />
        </VictoryChart>
    )
}