import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Theme} from "../../../utils";
import {GetModules} from "../../../Queries";
import 'jsoneditor/dist/jsoneditor.css';
import '../../../utils/darktheme.css';
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ConfigsPanel from "./ConfigsPanel";

const useStyles = makeStyles(theme => ({
    root: {
        width: 'auto',
        height: '90%',
        backgroundColor: theme.palette.primary.dark,
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
        padding: theme.spacing(1),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));


export default () => {
    document.title = 'Insert Config';
    const classes = useStyles(Theme);

    const [modules,] = GetModules();
    const [moduleId, setModuleId] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };

    useEffect(() => {
        if (!(modules && modules.length > tabIndex)) {
            setModuleId(null);
            return;
        }
        setModuleId(modules[tabIndex].id);
    }, [modules, tabIndex]);

    return (
        <div className={clsx(classes.root)}>
            <div
                className={clsx(classes.row)}
                style={{
                    backgroundColor: Theme.palette.secondary.main,
                }}
            >
                <div className={clsx(classes.pad)}>
                    <Typography
                        color='primary'
                        variant='h6'
                    >
                        Modules
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.content)}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant='scrollable'
                    orientation='vertical'
                    style={{backgroundColor: Theme.palette.secondary.light, color: Theme.palette.secondary.contrastText}}
                >
                    {modules && modules.map(m => (
                        <Tab
                            key={m.id}
                            label={m.name}
                        />
                    ))}
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        {moduleId && (
                            <div className={clsx(classes.pad)}>
                                <ConfigsPanel moduleId={moduleId} moduleName={modules[tabIndex]['name']}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}