import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import DataPicker from "./DataPicker";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Check, Delete, HelpOutline} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {Modal} from "@material-ui/core";
import DataFormats from "./DataFormats";
import DataValidator from "./DataValidator";
import DataGraph from "./DataGraph";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        height: '50%',
        padding: theme.spacing(1),
    },
    row: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
    graph: {
        flex: '1 1 100%',
    }
}));

export default () => {
    document.title = 'Time Series Analyzer';
    const classes = useStyles(Theme);

    const [rawFiles, setRawFiles] = useState(null);
    const [parsedFiles, setParsedFiles] = useState(null);

    const [formatOpen, setFormatOpen] = useState(false);
    const [stepOpen, setStepOpen] = useState(1);

    const [data, setData] = useState(null);
    const [xLabel, setXLabel] = useState(null);
    const [seriesNames, setSeriesNames] = useState(null);

    const handleFormatOpen = () => {
        setFormatOpen(true);
    };
    const handleFormatClose = () => {
        setFormatOpen(false);
    };

    const removeFile = index => {
        let newFiles = [...rawFiles];
        newFiles.splice(index, 1);
        setRawFiles([...newFiles]);
        setParsedFiles(null);
    };

    const restart = () => {
        setRawFiles(null);
        setParsedFiles(null);
        setFormatOpen(false);
        setStepOpen(1);
        setData(null);
        setXLabel(null);
        setSeriesNames(null);
    }

    useEffect(() => {
        if (!rawFiles) return;
        setStepOpen(2);
    }, [rawFiles]);
    useEffect(() => {
        if (!parsedFiles) return;
        let joined = [];
        parsedFiles.forEach(p => joined = joined.concat([...p.data]));
        let s = new Set();
        parsedFiles.forEach(p => p.series.forEach(ps => s.add(ps)));
        setSeriesNames([...s]);
        setXLabel(parsedFiles[0].x);
        setData(joined);
    }, [parsedFiles]);

    useEffect(() => {
        if (!(data && xLabel && seriesNames)) return;
        setStepOpen(3);
    }, [data, xLabel, seriesNames]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper/>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                    >
                        Step 1. Select your data
                    </Typography>
                </div>

                <div className={clsx(classes.pad)}>
                    <Check fontSize='large'
                           style={{color: stepOpen > 1 ? Theme.palette.primary.contrastText : Theme.palette.primary.main}}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Button style={{backgroundColor: Theme.palette.primary.main}} onClick={handleFormatOpen}>
                        <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
                            <HelpOutline fontSize='large' style={{color: Theme.palette.primary.contrastText}}/>
                        </Avatar>
                        <Typography>Formatting</Typography>
                    </Button>
                    <Modal open={formatOpen} onClose={handleFormatClose}>{DataFormats()}</Modal>
                </div>
                <div className={clsx(classes.pad)}>
                    <Button style={{backgroundColor: Theme.palette.primary.main}} onClick={restart}>
                        <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
                            <Delete fontSize='large' style={{color: Theme.palette.primary.contrastText}}/>
                        </Avatar>
                        <Typography>Restart</Typography>
                    </Button>
                </div>
            </div>
            <Divider/>
            {stepOpen === 1 && (
                <div className={clsx(classes.content)}>
                    <DataPicker files={rawFiles} setFiles={setRawFiles}/>
                </div>
            )}
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                    >
                        Step 2. Validate your data
                    </Typography>
                </div>

                <div className={clsx(classes.pad)}>
                    <Check fontSize='large'
                           style={{color: stepOpen > 2 ? Theme.palette.primary.contrastText : Theme.palette.primary.main}}/>
                </div>
            </div>
            <Divider/>
            {stepOpen === 2 && (
                <div className={clsx(classes.content)}>
                    <DataValidator rawFiles={rawFiles} setParsedFiles={setParsedFiles} removeFile={removeFile}/>
                </div>
            )}
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                    >
                        Step 3. Analyze your data
                    </Typography>
                </div>

                <div className={clsx(classes.pad)}>
                    <Check fontSize='large'
                           style={{color: stepOpen > 3 ? Theme.palette.primary.contrastText : Theme.palette.primary.main}}/>
                </div>
            </div>
            <Divider/>
            {stepOpen === 3 && (
                <div className={clsx(classes.content)}>
                    <DataGraph data={data} xLabel={xLabel} seriesNames={seriesNames}/>
                </div>
            )}
        </div>
    )
}