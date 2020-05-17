import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {GetCorpusById, GetUsedLanguages} from "../../../Queries";
import ToneGraph from "./ToneGraph";
import {F0} from "../../../FeatureExtraction";
import {MinMaxScaler} from "machinelearn/preprocessing";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    row: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
}));

export default () => {
    const classes = useStyles(Theme);
    const chinese = '男孩';
    const pinyin = 'nan2 hai2';
    const [nativeCorpus,] = GetCorpusById('aishell_BAC009S0008W0431_1');
    const [studentCorpus,] = GetCorpusById('aishell_BAC009S0008W0436_7');

    const [nativeWav, setNativeWav] = useState(null);
    const [studentWav, setStudentWav] = useState(null);
    const [nativeSampleRate, setNativeSampleRate] = useState(null);
    const [studentSampleRate, setStudentSampleRate] = useState(null);
    const [nativePhonemes, setNativePhonemes] = useState(null);
    const [studentPhonemes, setStudentPhonemes] = useState(null);
    const nativeF0 = F0(nativeWav, nativeSampleRate);
    const studentF0 = F0(studentWav, studentSampleRate);

    const [langauges, refetch] = GetUsedLanguages();

    useEffect(() => {
        if (!nativeCorpus || !studentCorpus) return;
        const newNativeCorpus = nativeCorpus.map(c => {
            return {
                ...c,
                sampleRate: c['wav']['samplerate'],
                wav: c['wav']['data'],
                phonemes: c['phonemes']['phonemes']
            }
        });
        const newStudentCorpus = studentCorpus.map(c => {
            return {
                ...c,
                sampleRate: c['wav']['samplerate'],
                wav: c['wav']['data'],
                phonemes: c['phonemes']['phonemes']
            }
        });
        if (!Boolean(newNativeCorpus.length)) return;
        const native = newNativeCorpus[0];
        setNativeSampleRate(native['sampleRate']);
        setNativeWav(native['wav']);
        setNativePhonemes(native['phonemes']);
        const student = newStudentCorpus[0];
        setStudentSampleRate(student['sampleRate']);
        setStudentWav(student['wav']);
        setStudentPhonemes(student['phonemes']);
    }, [nativeCorpus, studentCorpus]);

    const data = (s, name) => {
        if (!(s && name)) return [];
        let d = [];
        const scaler = () => {
            const scale = new MinMaxScaler({featureRange: [0, 1]});
            const f0 = scale.fit_transform(s.flatMap((f, index) => f ? f : []));
            const t = scale.fit_transform(s.flatMap((f, index) => f ? index : []));
            d = d.concat(f0.map((f, index) => {
                return {[name]: Math.round((f + Number.EPSILON) * 100) / 100, t: t[index]}
            }));
        };
        scaler(s, name);

        return d;
    };

    const phonemes = (phones, name) => {
        if (!(phones && name)) return [];
        let ps = [];
        const scaler = s => {
            const scale = new MinMaxScaler({featureRange: [0, 1]});
            return scale.fit_transform(s);
        };
        let scaled = scaler(phones.map(p => [p.xmin, p.xmax]).flat());
        for (let i = 0; i < scaled.length; i += 2) {
            const p = {xmin: scaled[i], xmax: scaled[i + 1], text: phones[i / 2].text, speaker: name}
            ps.push(p)
        }
        return ps;
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                    {nativeF0 && studentF0 && nativePhonemes && setStudentPhonemes && (
                        <ToneGraph
                            nativeF0={data(nativeF0, 'native')}
                            studentF0={data(studentF0, 'student')}
                            nativePhonemes={phonemes(nativePhonemes, 'native')}
                            studentPhonemes={phonemes(studentPhonemes, 'student')}
                        />
                    )}
            </div>
        </div>
    )
}