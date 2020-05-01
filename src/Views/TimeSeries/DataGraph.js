import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {RotateLeft} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
    },
    content: {
        padding: theme.spacing(1),
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    row: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
        flex: '1 1 auto',
    }
}))

const colors = ['#aa0808', '#08aa08', '#0808aa', '#881010', '#108810', '#101088', '#660101', '#016601', '#010166'];

export default ({data, xLabel, seriesNames}) => {
    const classes = useStyles(Theme);

    const [downLocation, setDownLocation] = useState(null);
    const [upLocation, setUpLocation] = useState(null);

    const [left, setLeft] = useState('auto');
    const [right, setRight] = useState('auto');

    const handleSelect = () => {
        if (!(downLocation && upLocation)) return;
        let lo, high;
        lo = Math.min(downLocation, upLocation);
        high = Math.max(downLocation, upLocation);
        setLeft(lo);
        setRight(high);
        setDownLocation(null);
        setUpLocation(null);
    };

    const resetGraph = () => {
        setLeft('auto');
        setRight('auto');
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        paragraph
                    >
                        Click and drag on an area of the graph to zoom in. Press the reset button to reset the graph.
                    </Typography>
                </div>
                <Button style={{backgroundColor: Theme.palette.primary.main}} onClick={resetGraph}>
                    <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
                        <RotateLeft style={{color: Theme.palette.primary.contrastText}}/>
                    </Avatar>
                    <Typography>Reset Graph</Typography>
                </Button>
            </div>
            <div className={clsx(classes.content)}>
                {data && xLabel && seriesNames.length && (
                    <ResponsiveContainer>
                        <LineChart
                            margin={{top: 10, right: 0, left: 10, bottom: 10}}
                            data={data}
                            onMouseDown={e => setDownLocation(e.activeLabel)}
                            onMouseMove={e => downLocation && setUpLocation(e.activeLabel)}
                            onMouseUp={handleSelect}
                        >
                            <CartesianGrid strokeDasharray='3 3' stroke={Theme.palette.secondary.main}/>
                            <XAxis
                                allowDataOverflow
                                type='number'
                                dataKey={xLabel}
                                label={{value: xLabel, fill: Theme.palette.primary.contrastText, dy: 20}}
                                domain={[left, right]}
                            />
                            <YAxis/>
                            <Tooltip/>
                            <Legend verticalAlign='top' align='right'/>
                            {seriesNames.map((s, index) => (
                                <Line key={index} stroke={colors[index]} dataKey={s} dot={false}/>
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}