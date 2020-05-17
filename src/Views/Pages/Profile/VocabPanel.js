import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {GetVocabularyLists} from "../../../Queries";
import Typography from "@material-ui/core/Typography";
import {ExpandMore} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VocabTable from "./VocabTable";

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
        flex: '1 1 auto',
        padding: theme.spacing(1),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));

export default ({lessonId}) => {
    const classes = useStyles(Theme);

    const [vocab,] = GetVocabularyLists(lessonId);
    const [vocabId, setVocabId] = useState(null);
    const [vocabName, setVocabName] = useState(null);
    const [vocabDescription, setVocabDescription] = useState(null);

    const [translations, setTranslations] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };

    useEffect(() => {
        if (!(vocab && vocab.length > tabIndex)) {
            setVocabId(null);
            return;
        }
        setVocabId(vocab[tabIndex].id);
        setTranslations(JSON.parse(vocab[tabIndex].translations));
        setVocabName(vocab[tabIndex].name);
        setVocabDescription(vocab[tabIndex].description);
    }, [vocab, tabIndex]);

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore style={{color: Theme.palette.primary.main}}/>}
                style={{backgroundColor: Theme.palette.secondary.main}}
            >
                <Typography
                    color='primary'
                    variant='h6'>
                    Vocabulary Lists
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant='scrollable'
                    orientation='vertical'
                    style={{
                        backgroundColor: Theme.palette.secondary.light
                    }}
                >
                    {vocab && vocab.map(v => (
                        <Tab
                            key={v.id}
                            label={
                                <Typography
                                    color='primary'
                                >
                                    {v.name}
                                </Typography>
                            }
                            style={{color: Theme.palette.primary.main}}
                        />
                    ))}
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            {(vocab && vocab.length <= tabIndex) && (
                                <TextField
                                    required
                                    label='Vocab Description'
                                    value={vocab[tabIndex].description}
                                />
                            )}
                        </div>
                    </div>
                    {vocab && vocab.length > tabIndex && (
                        <div className={clsx(classes.pad)}>
                            <VocabTable vocabId={vocabId} vocabName={vocabName} vocabDescription={vocabDescription}
                                        translations={translations}/>
                        </div>
                    )}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};