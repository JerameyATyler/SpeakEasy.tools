import React from 'react';
import {Theme} from "../Components/Theme";
import {Area, AreaChart, CartesianGrid, Label, ReferenceArea, Text, XAxis, YAxis} from "recharts";
import {MinMaxScale, PadLength} from "../Components/SignalProcessing";
import {F0FromBuffer} from "../Components/FeatureExtraction";
import uuid from 'uuid/v4';

export default ({s1, s2}) => {
    const s1Phonemes = s1.phonemes.phonemes.map(p => {
        return {
            text: p.text,
            xmin: p.xmin / s1.wav.samplerate,
            xmax: p.xmax / s1.wav.samplerate,
        }
    });
    const s2Phonemes = s2.phonemes.phonemes.map(p => {
        return {
            text: p.text,
            xmin: p.xmin / s2.wav.samplerate,
            xmax: p.xmax / s2.wav.samplerate
        }
    });

    const [f01, t1] = F0FromBuffer({buffer: s1.wav.data, sampleRate: s1.wav.samplerate});
    const [f02, t2] = F0FromBuffer({buffer: s2.wav.data, sampleRate: s2.wav.samplerate});

    const f01Padded = PadLength({s: f01, length: Math.max(f01.length, f02.length), fill: 'mean'});
    const f02Padded = PadLength({s: f02, length: Math.max(f01.length, f02.length), fill: 'mean'});

    const t1Padded = PadLength({s: t1, length: Math.max(t1.length, t2.length), fill: 'extend'});
    const t2Padded = PadLength({s: t2, length: Math.max(t1.length, t2.length), fill: 'extend'});

    const f01Scaled = MinMaxScale({s: f01Padded});
    const f02Scaled = MinMaxScale({s: f02Padded});

    const t1Scaled = MinMaxScale({s: t1Padded});
    const t2Scaled = MinMaxScale({s: t2Padded});

    const t1Phones = [Math.min(...t1), Math.max(...t1)];
    const t2Phones = [Math.min(...t2), Math.max(...t2)];

    for (let i = 0; i < s1Phonemes.length; i++) {
        t1Phones.push(s1Phonemes[i].xmin);
        t1Phones.push(s1Phonemes[i].xmax);
    }

    for (let i = 0; i < s2Phonemes.length; i++) {
        t2Phones.push(s2Phonemes[i].xmin);
        t2Phones.push(s2Phonemes[i].xmax);
    }

    const t1PhonesScaled = MinMaxScale({s: t1Phones}).slice(2);
    const t2PhonesScaled = MinMaxScale({s: t2Phones}).slice(2);

    const s1PhonemesFormatted = [];
    const s2PhonemesFormatted = [];

    for (let i = 0; i < t1PhonesScaled.length; i += 2) {
        s1PhonemesFormatted.push({
            xmin: Math.round(t1PhonesScaled[i] * 100) / 100,
            xmax: Math.round(t1PhonesScaled[i + 1] * 100) / 100,
            text: s1Phonemes[Math.floor(i / 2)].text
        });
    }
    for (let i = 0; i < t2PhonesScaled.length; i += 2) {
        s2PhonemesFormatted.push({
            xmin: Math.round(t2PhonesScaled[i] * 100) / 100,
            xmax: Math.round(t2PhonesScaled[i + 1] * 100) / 100,
            text: s2Phonemes[Math.floor(i / 2)].text
        });
    }

    const joinData = (f, t, name) => {
        const joined = [];
        for (let i = 0; i < f.length; i++) {
            joined.push({
                t: Math.round((t[i] + Number.EPSILON) * 100) / 100,
                [name]: f[i] === null ? null : Math.round((f[i] + Number.EPSILON) * 100) / 100
            });
        }
        return joined;
    };

    const notNormalizedData = joinData(f01, t1, 'tone1').concat(joinData(f02, t2, 'tone2'));
    const normalizedData = joinData(f01Scaled, t1Scaled, 'tone1').concat(joinData(f02Scaled, t2Scaled, 'tone2'));

    return (
        <>
            <AreaChart
                width={730}
                height={250}
                margin={{top: 50, right: 30, left: 20, bottom: 5}}
                data={notNormalizedData}
            >
                <defs>
                    <linearGradient id='tone1' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.accent.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.accent.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id='tone2' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.error.main} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke={Theme.palette.accent.main}/>
                <XAxis
                    type='number'
                    dataKey='t'
                    stroke={Theme.palette.primary.contrastText}
                    domain={['dataMin', 'dataMax']}
                >
                    <Label
                        value="Time (s)"
                        offset={0}
                        position="insideBottom"
                        fill={Theme.palette.primary.contrastText}/>
                    <Label
                        value={s1.graphemes}
                        offset={180}
                        position="top"
                        fontSize='24'
                        fill={Theme.palette.primary.contrastText}
                    />
                </XAxis>
                <YAxis
                    type='number'
                    stroke={Theme.palette.primary.contrastText}
                    domain={[-2000, 'dataMax']}
                    label={
                        <Text
                            x={-20}
                            y={15}
                            dx={50}
                            dy={150}
                            offset={0}
                            angle={-90}
                            fill={Theme.palette.primary.contrastText}
                        >
                            f0 (Hz)
                        </Text>
                    }
                >
                </YAxis>
                <Area
                    dataKey='tone1'
                    type='monotone'
                    stroke={Theme.palette.primary.contrastText}
                    fillOpacity={1}
                    fill='url(#tone1)'
                />
                <Area
                    dataKey='tone2'
                    type='monotone'
                    stroke={Theme.palette.primary.contrastText}
                    fillOpacity={1}
                    fill='url(#tone2)'
                />
                {s1Phonemes.map(s =>
                    <ReferenceArea
                        key={uuid()}
                        x1={s.xmin}
                        x2={s.xmax}
                        y1={0}
                        y2={-1000}
                        fill={Theme.palette.accent.main}
                        label={{value: s.text, fill: Theme.palette.primary.contrastText}}
                        stroke={Theme.palette.primary.contrastText}
                        strokeDasharray='3 3'
                        ifOverflow='extendDomain'
                    />)}
                {s2Phonemes.map(s =>
                    <ReferenceArea
                        key={uuid()}
                        x1={s.xmin}
                        x2={s.xmax}
                        y1={-1000}
                        y2={-2000}
                        fill={Theme.palette.error.main}
                        label={{value: s.text, fill: Theme.palette.primary.contrastText}}
                        stroke={Theme.palette.primary.contrastText}
                        strokeDasharray='3 3'
                        ifOverflow='extendDomain'
                    />)}
            </AreaChart>
            <AreaChart
                width={730}
                height={250}
                margin={{top: 50, right: 30, left: 20, bottom: 5}}
                data={normalizedData}
            >
                <defs>
                    <linearGradient id='tone1' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.accent.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.accent.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id='tone2' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.error.main} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke={Theme.palette.accent.main}/>
                <XAxis
                    type='number'
                    dataKey='t'
                    stroke={Theme.palette.primary.contrastText}
                    domain={['dataMin', 'dataMax']}
                >
                    <Label
                        value="Time scaled to [0, 1]"
                        offset={0}
                        position="insideBottom"
                        fill={Theme.palette.primary.contrastText}/>
                    <Label
                        value={s1.graphemes}
                        offset={180}
                        position="top"
                        fontSize='24'
                        fill={Theme.palette.primary.contrastText}
                    />
                </XAxis>
                <YAxis
                    type='number'
                    stroke={Theme.palette.primary.contrastText}
                    domain={[-0.25, 'dataMax']}
                    label={
                        <Text
                            x={-15}
                            y={20}
                            dx={50}
                            dy={150}
                            offset={0}
                            angle={-90}
                            fill={Theme.palette.primary.contrastText}
                        >
                            minMaxScale(f0)
                        </Text>
                    }
                />
                <Area
                    dataKey='tone1'
                    type='monotone'
                    stroke={Theme.palette.primary.contrastText}
                    fillOpacity={1}
                    fill='url(#tone1)'
                />
                <Area
                    dataKey='tone2'
                    type='monotone'
                    stroke={Theme.palette.primary.contrastText}
                    fillOpacity={1}
                    fill='url(#tone2)'
                />
                {s1PhonemesFormatted.map(s =>
                    <ReferenceArea
                        key={uuid()}
                        x1={s.xmin}
                        x2={s.xmax}
                        y1={0}
                        y2={-.125}
                        fill={Theme.palette.accent.main}
                        label={{value: s.text, fill: Theme.palette.primary.contrastText}}
                        ifOverflow='extendDomain'
                        stroke={Theme.palette.primary.contrastText}
                        strokeDasharray='3 3'
                    />)}
                {s2PhonemesFormatted.map(s =>
                    <ReferenceArea
                        key={uuid()}
                        x1={s.xmin}
                        x2={s.xmax}
                        y1={-.125}
                        y2={-.25}
                        fill={Theme.palette.error.main}
                        label={{value: s.text, fill: Theme.palette.primary.contrastText}}
                        ifOverflow='extendDomain'
                        stroke={Theme.palette.primary.contrastText}
                        strokeDasharray='3 3'
                    />)}
            </AreaChart>

        </>
    );
}