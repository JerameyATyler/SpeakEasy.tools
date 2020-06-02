import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {encodeImageFileAsURL, Theme} from "../../../utils";
import clsx from "clsx";
import {DeleteConfig, GetConfigs, InsertConfig, UpdateConfig} from "../../../Queries";
import Typography from "@material-ui/core/Typography";
import {Add, Check, Clear, Delete, Edit, ExpandMore, Help} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import JSONEditor from "jsoneditor";
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(theme => ({
    root: {
        width: 'auto',
        height: '90%'
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row noWrap'
    },
    column: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(2),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    },
    json: {
        width: 400
    }
}));

export default ({moduleId, moduleName}) => {
    const classes = useStyles(Theme);

    const [configs,] = GetConfigs(moduleId);
    const [configId, setConfigId] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [newName, setNewName] = useState('');
    const [newConfig, setNewConfig] = useState({});

    const [insertName, setInsertName] = useState(null);
    const [insertConfig, setInsertConfig] = useState(null);

    const [deleteId, setDeleteId] = useState(null);

    const rowsInserted = InsertConfig(moduleId, insertName, insertConfig);
    const rowsDeleted = DeleteConfig(deleteId);

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(null);
    const [editConfig, setEditConfig] = useState(null);

    const [container, setContainer] = useState(null);
    
    const [jsonEditor, setJsonEditor] = useState(null);

    const rowsEdited = UpdateConfig(configId, editName, editConfig);

    const [files, setFiles] = useState([]);
    const [dropZoneKey, setDropZoneKey] = useState(0);

    const handleFileChange = fs => {
        if(!Boolean(fs.length)) return;
        Promise.all(fs.map(f => encodeImageFileAsURL(f))).then(values => {
            setFiles([...values]);
        });
    };
    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };
    const handleDelete = lId => {
        if (window.confirm("Are you sure you want to delete this configuration?")) {
            setDeleteId(lId);
        }
    };
    const handleAdd = () => {
        setInsertConfig({...jsonEditor.get(), files: files});
        setInsertName(newName);
    };
    const handleClear = () => {
        setDropZoneKey(prevState => prevState+1);
        setNewName('');
        setNewConfig({});
        setInsertName(null);
        setInsertConfig(null);
    };
    const handleCancel = () => {
        setNewName('');
        setNewConfig({});
        setEditName(null);
        setEditConfig(null);
        setEdit(false);
    };
    const handleEdit = () => {
        setEditName(newName);
        setEditConfig(newConfig);
    };

    useEffect(() => {
        if(!jsonEditor) return;
        if (!(configs && configs.length > tabIndex)) {
            setConfigId(null);
            jsonEditor.set({});
            handleClear();
            handleCancel();
            return;
        }
        // console.log(configs[tabIndex]['config']);
        try {
            let parsed = JSON.parse(configs[tabIndex]['config']);
            setFiles([...parsed['files']]);
            setDropZoneKey(prevState => prevState + 1);
            delete parsed['files'];
            setConfigId(configs[tabIndex].id);
            jsonEditor.set(parsed);
        }finally{return console.log("error in parsing json")}
    }, [configs, tabIndex, jsonEditor]);
    useEffect(() => {
        if (!rowsDeleted) return;
        window.location.reload();
    }, [rowsDeleted]);
    useEffect(() => {
        if (!rowsInserted) return;
        window.location.reload();
    }, [rowsInserted]);
    useEffect(() => {
        if (!rowsEdited) return;
        window.location.reload();
    }, [rowsEdited]);
    useEffect(() => {
        if (!container) return;
        setJsonEditor(new JSONEditor(container, {mode: "text"}));
    }, [container]);

    return (
        <ExpansionPanel expanded>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore style={{color: Theme.palette.primary.main}}/>}
                style={{backgroundColor: Theme.palette.secondary.main}}
            >
                <Typography
                    color='primary'
                    variant='h6'>
                    Configurations: {moduleName}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant='scrollable'
                    style={{
                        backgroundColor: Theme.palette.secondary.light,
                    }}
                    orientation='vertical'
                >
                    {configs && configs.map(c => (
                        <Tab
                            key={c.id}
                            label={
                                <>
                                    {
                                        edit && (c.id === configs[tabIndex].id) ? (
                                            <TextField
                                                required
                                                label='Edit Config Name'
                                                placeholder='Config Name'
                                                defaultValue={c.name}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                        ) : (
                                            <Typography
                                                color='primary'
                                            >
                                                {c.name}
                                            </Typography>
                                        )}
                                </>
                            }
                            style={{color: Theme.palette.primary.main}}
                        />
                    ))}
                    <Tab label={
                        <>
                            {
                                configs && configs.length <= tabIndex ? (
                                    <TextField
                                        required
                                        label='Add Config'
                                        placeholder='Config Name'
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                    />
                                ) : (
                                    <Typography
                                        color='primary'
                                    >
                                        Add Config
                                    </Typography>
                                )}
                            <Add style={{color: Theme.palette.primary.main}}/>
                        </>
                    }/>
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            {configs && configs.length <= tabIndex ? (
                                <>
                                    <IconButton>
                                        <Help style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.button)}
                                        disabled={!(Boolean(newName))}
                                        onClick={handleAdd}
                                    >
                                        <Check/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleClear}
                                    >
                                        <Clear/>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    {edit ? (
                                        <>
                                            <IconButton>
                                                <Help style={{color: Theme.palette.secondary.main}}/>
                                            </IconButton>
                                            <IconButton
                                                onClick={handleEdit}
                                            >
                                                <Check/>
                                            </IconButton>
                                            <IconButton
                                                onClick={handleCancel}
                                            >
                                                <Clear/>
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton>
                                                <Help style={{color: Theme.palette.secondary.main}}/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => setEdit(true)}
                                            >
                                                <Edit/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(configs[tabIndex].id)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <div className={clsx(classes.json)} ref={elem => setContainer(elem)}/>
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <DropzoneArea
                                key={dropZoneKey}
                                onChange={handleFileChange}
                                dropzoneText='Drag and drop files here or click to upload'
                                showFileNames
                                filesLimit={5}
                                initialFiles={files}
                            />
                        </div>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};