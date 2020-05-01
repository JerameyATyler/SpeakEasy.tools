import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {Typography} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import {Check} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";

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
}));

export default ({setFiles}) => {
    const classes = useStyles(Theme);

    const [userFiles, setUserFiles] = useState([]);
    const handleChange = fs => {
        setUserFiles(fs);
    };
    const handleConfirm = () => {
        setFiles(userFiles);
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        paragraph
                        style={{width: 500, color: Theme.palette.primary.contrastText}}
                    >
                        The Time Series Analyzer can parse time series data stored in .csv, .json, .ods, tsv, or .xlsx
                        file formats. Drag and drop your files into the box below or click to get
                        started. Click the "?" button above for data formatting instructions.
                    </Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    <DropzoneArea
                        onChange={handleChange}
                        dropzoneText='Drag and drop .csv, .tsv, .xlsx, .ods, or .json files here or click'
                        acceptedFiles={[
                            '.csv',
                            '.tsv',
                            '.json',
                            '.xlsx',
                            '.ods'
                        ]}
                        showFileNames
                        filesLimit={5}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Button
                        style={{
                            backgroundColor: Theme.palette.primary.main,
                        }}
                        disabled={!(userFiles && userFiles.length)}
                        onClick={handleConfirm}
                    >
                        <Avatar
                            style={{
                                backgroundColor: Theme.palette.primary.main
                            }}>
                            <Check style={{color: Theme.palette.primary.contrastText}}/>
                        </Avatar>
                        <Typography style={{color: Theme.palette.primary.contrastText}}>Confirm</Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};