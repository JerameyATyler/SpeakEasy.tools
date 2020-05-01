import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {Cancel} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    pad: {
        padding: theme.spacing(1),
    },
}))

export default ({rawFiles, setParsedFiles, removeFile}) => {
    const classes = useStyles(Theme);
    const [parses, setParses] = useState([]);

    const [xChecked, setXChecked] = useState(false);
    const [xDisabled, setXDisabled] = useState(true);
    const [xLabel, setXLabel] = useState(null);

    const parseLabels = file => {
        if (/(\.csv|\.tsv)$/i.exec(file.name)) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                Papa.parse(evt.target.result, {
                    worker: true,
                    dynamicTyping: true,
                    complete: result => {
                        const data = {
                            x: result.meta.fields[0],
                            series: result.meta.fields.slice(1),
                            data: result.data,
                            fileName: file.name
                        };
                        setParses(prevState => [...prevState, data]);
                    },
                    header: true
                });
            };
            reader.readAsText(file);
        } else if (/(\.ods|\.xlsx)$/i.exec(file.name)) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                let data = new Uint8Array(evt.target.result);
                let workBook = XLSX.read(data, {type: 'array'});
                workBook.SheetNames.forEach(s => {
                    const j = JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(workBook.Sheets[s])));

                    const d = {
                        x: Object.keys(j[0])[0],
                        series: Object.keys(j[0]).slice(1),
                        data: j,
                        fileName: file.name
                    };
                    setParses(prevState => [...prevState, d]);
                })
            };
            reader.readAsArrayBuffer(file);
        } else if (/(\.json)$/i.exec(file.name)) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                setParses(prevState => [...prevState, {...JSON.parse(evt.target.result), fileName: file.name}]);
            };
            reader.readAsText(file);
        }
    };

    const handleRemove = index => {
        setParses([]);
        setXChecked(false);
        setXDisabled(true);
        setXLabel(null);
        removeFile(index);
    }

    useEffect(() => {
        if (!rawFiles) return;
        rawFiles.forEach(f => parseLabels(f));
    }, [rawFiles]);

    useEffect(() => {
        if (!parses.length) return;
        if (parses.every(p => p.x === parses[0].x) && typeof parses[0].data[0][parses[0].x] === 'number') {
            setXLabel(parses[0].x);
            setXDisabled(false);
        }
    }, [parses]);
    useEffect(() => {
        if (!(xChecked)) return;
        setParsedFiles(parses);
    }, [xChecked, parses, setParsedFiles])
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        paragraph
                        style={{width: 500, color: Theme.palette.primary.contrastText}}
                    >
                        Use the check boxes to confirm your axes and series labels.
                    </Typography>
                </div>
                {xDisabled && (
                    <div className={clsx(classes.pad)}>
                        <Typography
                            paragraph
                            style={{
                                width: 500,
                                color: Theme.palette.primary.contrastText,
                                border: 'thin solid red',
                                borderRadius: 10
                            }}
                        >
                            You x axis data needs to be in a number format.
                        </Typography>
                    </div>)}
                <div className={clsx(classes.pad)}>
                    <TableContainer component={Paper}>
                        <Table className={clsx(classes.table)} aria-label='file-format-example'>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>File name</TableCell>
                                    <TableCell>x-axis label</TableCell>
                                    <TableCell>Approve x-axis label</TableCell>
                                    <TableCell>Series names</TableCell>
                                    <TableCell>Approve series names</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parses && parses.map((f, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <IconButton style={{backgroundColor: Theme.palette.primary.dark}}
                                                        onClick={() => handleRemove(index)}>
                                                <Avatar style={{backgroundColor: Theme.palette.primary.dark}}>
                                                    <Cancel style={{color: Theme.palette.primary.contrastText}}/>
                                                </Avatar>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{f.fileName}</TableCell>
                                        <TableCell>{f.x}</TableCell>
                                        <TableCell/>
                                        <TableCell>
                                            <Autocomplete
                                                id={`${f.fileName}-series`}
                                                options={f.series}
                                                getOptionLabel={option => option}
                                                style={{width: 300}}
                                                renderInput={params => <TextField{...params} label='Series names'
                                                                                 variant='outlined'/>}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {parses && parses.length > 0 && (
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell>
                                            {xLabel}
                                        </TableCell>
                                        <TableCell/>
                                        <TableCell>
                                            <Checkbox
                                                disabled={xDisabled}
                                                checked={xChecked}
                                                onChange={e =>
                                                    setXChecked(e.target.checked)}/>
                                        </TableCell>
                                        <TableCell>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}