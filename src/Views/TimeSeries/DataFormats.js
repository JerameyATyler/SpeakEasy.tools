import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flex: '1 1 100%',
        width: '90%',
        height: '90%',
        backgroundColor: theme.palette.primary.light,
        margin: 'auto'
    },
    row: {
        width: '100%',
        display: 'flex',

    },
    pad: {
        padding: theme.spacing(1),
        flex: '1 1 auto',
    },
    json: {
        height: '25%',
        overflow: 'auto'
    }
}));

const jsonData = {
    x: 'Date',
    series: ['AAPL', 'AMZN', 'IBM'],
    data: [
        {
            ['Date (YYYY-MM-DD)']: '2019-04-17',
            ['AAPL']: 203.13,
            ['AMZN']: 1864.82,
            ['IBM']: 139.11
        },
        {
            ['Date (YYYY-MM-DD)']: '2019-04-18',
            ['AAPL']: 203.86,
            ['AMZN']: 1861.69,
            ['IBM']: 140.33
        },
        {
            ['Date (YYYY-MM-DD)']: '2019-04-19',
            ['AAPL']: 202.53,
            ['AMZN']: 1887.31,
            ['IBM']: 138.89
        },
        {
            ['Date (YYYY-MM-DD)']: '2019-04-20',
            ['AAPL']: 207.48,
            ['AMZN']: 1923.77,
            ['IBM']: 140.44
        },
    ]
}

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h2'
                        style={{color: Theme.palette.primary.contrastText}}
                    >
                        Formatting Your Data
                    </Typography>
                    <Divider/>
                    <Typography
                        paragraph
                        style={{width: 500, color: Theme.palette.primary.contrastText}}
                    >
                        The Time Series Analyzer can parse time series data stored in .csv, .json, .ods, tsv, or .xlsx
                        file formats.
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                        style={{color: Theme.palette.primary.contrastText}}
                    >
                        Formatting .csv, .ods, .tsv, and .xlsx file formats
                    </Typography>
                    <Divider/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        paragraph
                        style={{width: 500, color: Theme.palette.primary.contrastText}}
                    >
                        For .csv, .ods, .tsv, and .xlsx file formats please format your data so that the first column
                        contains
                        the x axis label followed by the x axis data and each additional column contains the series
                        label
                        followed by the y axis data for a single series. See the example:
                    </Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    <TableContainer component={Paper}>
                        <Table className={clsx(classes.table)} aria-label='file-format-example'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date (YYYY-MM-DD)</TableCell>
                                    <TableCell>AAPL</TableCell>
                                    <TableCell>AMZN</TableCell>
                                    <TableCell>IBM</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>2019-04-17</TableCell>
                                    <TableCell>203.03</TableCell>
                                    <TableCell>1864.82</TableCell>
                                    <TableCell>139.11</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2019-04-18</TableCell>
                                    <TableCell>203.86</TableCell>
                                    <TableCell>1861.69</TableCell>
                                    <TableCell>140.33</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2019-04-19</TableCell>
                                    <TableCell>204.53</TableCell>
                                    <TableCell>1887.31</TableCell>
                                    <TableCell>138.89</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2019-04-20</TableCell>
                                    <TableCell>207.48</TableCell>
                                    <TableCell>1923.77</TableCell>
                                    <TableCell>140.44</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                        style={{color: Theme.palette.primary.contrastText}}
                    >
                        Formatting .json file format
                    </Typography>
                    <Divider/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        paragraph
                        style={{width: 500, color: Theme.palette.primary.contrastText}}
                    >
                        For .json file format please massage your data into a JSON format
                        with field for "data", "x" axis label, and "series" names. The "x" axis label should contain the
                        label that identifies the x axis data while "series" names is an array containing the names of
                        the series. The "data" field should contain an array of objects. Each object should have a field
                        for the x axis where the key is the x axis label and the value is the value is the x data and
                        one field for each series where the key is the series label and the value is the y data. See the
                        example below:
                    </Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    <div className={clsx(classes.json)}>
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};