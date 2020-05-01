import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {Card} from "../../Components/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column noWrap'
    },
    column: {
        flex: '1 1 100%',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
    0: {
        backgroundColor: "#444444",
        color: "#444444"
    },
    2: {
        backgroundColor: "#8a8a4a",
        color: "#ffffff"
    },
    4: {
        backgroundColor: "#727229",
        color: "#ffffff"
    },
    8: {
        backgroundColor: "#406868",
        color: "#ffffff"
    },
    16: {
        backgroundColor: "#2c5353",
        color: "#ffffff"
    },
    32: {
        backgroundColor: "#194545",
        color: "#ffffff"
    },
    64: {
        backgroundColor: "#ad896b",
        color: "#ffffff"
    },
    128: {
        backgroundColor: "#8a674a",
        color: "#ffffff"
    },
    256: {
        backgroundColor: "#724a29",
        color: "#ffffff"
    },
    512: {
        backgroundColor: "#654a74",
        color: "#ffffff"
    },
    1024: {
        backgroundColor: "#4e335c",
        color: "#ffffff"
    },
    2048: {
        backgroundColor: "#3c1e4c",
        color: "#ffffff"
    }
}));

export default ({value, language, score}) => {
    const classes = useStyles(Theme);

    const [lang, setLang] = useState('english');
    useEffect(() => {
        if (!language) return;
        setLang(language['text'].toLowerCase());
    }, [language]);

    useEffect(() => {
        if(!score) return;

    }, [score]);
    const getText = tile => {
        const values = {
            0: {
                pinyin: 0,
                chinese: 0,
                english: 0,
            },
            2: {
                pinyin: 'Èr',
                chinese: '二',
                english: 2,
            },
            4: {
                pinyin: 'Sì',
                chinese: '四',
                english: 4,
            },
            8: {
                pinyin: 'Bā',
                chinese: '八',
                english: 8,
            },
            16: {
                pinyin: 'Shí liù',
                chinese: '十六',
                english: 16,
            },
            32: {
                pinyin: 'Sānshí èr',
                chinese: '三十二',
                english: 32,
            },
            64: {
                pinyin: 'Liùshísì',
                chinese: '六十四',
                english: 64,
            },
            128: {
                pinyin: 'yī bǎi èr shí bā',
                chinese: '一百二十八',
                english: 128,
            },
            256: {
                pinyin: 'liǎng bǎi wǔ shí liù',
                chinese: '两百五十六',
                english: 256,
            },
            512: {
                pinyin: 'wǔ bǎi yī shí èr',
                chinese: '五百一十二',
                english: 512,
            },
            1024: {
                pinyin: 'yī qiān líng èr shí sì',
                chinese: '一千零二十四',
                english: 1024,
            },
            2048: {
                pinyin: 'liǎng qiān líng sì shí bā',
                chinese: '两千零四十八',
                english: 2048,
            }
        };
        if (lang === 'color') return '';
        if (lang === 'chaos') return values[tile][['chinese', 'pinyin', 'english'][Math.floor(Math.random() * 3)]];
        if (lang === 'adaptive') {
            const langs = ['english', 'pinyin', 'chinese'];
            let index = Math.random() * (Math.log2(Math.max(Math.log2(Math.max(Math.log2(Math.max(score(), 2)), 2)), 2)) - 1);
            index = Math.round(index + Number.EPSILON);
            console.log(index);
            return values[tile][langs[index]];
        }
        else return values[tile][lang];
    };

    const getBody = () => {
        return (
            <div className={clsx(classes.content, classes[value])}>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h4'>
                            {getText(value)}
                        </Typography>
                    </div>
                </div>
            </div>
        )

    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    stayOpen={true}
                    title={() => ''}
                    body={getBody}
                />
            </div>
        </div>
    )
}