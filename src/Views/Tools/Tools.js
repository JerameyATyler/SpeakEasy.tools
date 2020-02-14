import React from "react";
import {NormalizedTones, Onset, Pitch} from "../../Visualizations";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Toolbar} from "@material-ui/core";
import clsx from "clsx";
import {Theme} from "../../Components/Theme";
import Divider from "@material-ui/core/Divider";
import MathJax from 'react-mathjax';
import MathJaxProvider from "react-mathjax/lib/Provider";
import MathJaxNode from "react-mathjax/lib/Node";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(3),
    }
}));

export default () => {
    const GET_CORPUS_EXAMPLES = gql`
        query  {
            corpus(limit: 2, where: {graphemes: {_eq: "父母"}}) {
                graphemes
                phonemes
                wav
            }
        }
    `;
    const {loading, error, data} = useQuery(GET_CORPUS_EXAMPLES);

    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <Typography
                variant='h2'
                color='secondary'
                gutterBottom
            >
                SpeakEasy.tools - Under the hood
            </Typography>
            <Divider/>
            <Typography
                variant='subtitle1'
                color='secondary'
                gutterBottom
            >
                SpeakEasy.tools utilizes techniques from artificial intelligence, speech/signal/audio
                processing, natural language processing, and deep learning to name a few. In this section
                we give small examples of how some of our tools work.
            </Typography>
            <Typography
                variant='h4'
                color='secondary'
                gutterBottom
            >
                Speech Onset Detection Using Signal Energy
            </Typography>
            <Divider/>
            <Typography
                variant='subtitle1'
                color='secondary'
                gutterBottom
            >
                One common task in speech recognition is to find the onset and offset, or start and stop times, of a
                speech signal. The onset of a signal can be found many different ways; you can examine the signal's
                energy, phase, spectral flux, time-domain, or complex-domain to name a few. The method
                you choose is determined by the characteristics of the signal you are examining. In this we will
                use your speech signal's energy to determine the onset and offset of your speech. We use energy here
                because human speech tends to expend the majority of it's energy at the beginning.
            </Typography>
            <Typography
                variant='subtitle1'
                color='secondary'
                gutterBottom
            >
                If x is our speech signal w is a windowing function shifted over our signal, the local energy of x with
                respect to w is defined as:
            </Typography>
            <Typography
                variant='h6'
                color='secondary'
                gutterBottom
            >
                <MathJax.Provider>
                    <MathJax.Node formula='w:\mathbb{Z}\rightarrow\mathbb{R}'/>
                    <MathJax.Node formula='E^x_w:\mathbb{Z}\rightarrow\mathbb{R}'/>
                    <MathJax.Node
                        formula='E_w^x(n) := \Sigma_{m=-M}^M|x(n + m)w(m)|^2 = \Sigma_{m\epsilon \mathbb{Z}}|x(m)w(m-n)|^2\quad[1]'/>
                </MathJax.Provider>
            </Typography>
            <Typography
                variant='subtitle1'
                color='secondary'
                gutterBottom
            >
                <p>
                    This algorithm results in values that are asymptotic, they'll get really close to 0 but not actually
                    reach 0. Because of this we need to run the results of our energy function through a high-pass
                    filter, a function that only allows values through that are above some threshold. We are
                    heuristically setting our high-pass filter so that anything above 0.1 is allows to pass while 0 is
                    passed for anything below 0.1. Any value that is allowed through the high-pass filter is a sample in
                    the signal that potentially contains speech.
                </p>
                <p>
                    Let's see the process in action. Press the button below to record your voice. The filled in area of
                    the graph represents the energy of your voice. The vertical lines show which times on the graph
                    contain
                    speech.
                </p>
            </Typography>
            <Onset/>
            <Typography
                variant='h4'
                color='secondary'
            >
                Fundamental Frequency(f0) Estimation using YIN Pitch Detection Algorithm
            </Typography>
            <Divider/>
            <Typography
                variant='subtitle1'
                color='secondary'
            >
                <p>
                    In signal processing and speech processing it is common to identify the fundamental frequency(f0),
                    the lowest frequency, of your signal. In music processing f0 can be used to find the time signature
                    of a piece or to transcribe notes. f0 can be used in speech processing is to determine a speaker's
                    tone of voice and to automatic tone recognition for tonal languages.
                </p>
                <p>
                    Pitch detection algorithms tend to base their approach off of an auto-correlation function,
                    correlating a signal with a phase shifted copy of the signal. This is meant to mimic how human
                    biology correlates the signals received by the individual ears into a single signal in the auditory
                    cortex. f0 estimation is an open problem and as such no one standard method exists. Computational
                    complexity, signal type, cost of false positives and negatives need to be taken into account when
                    selecting a pitch detection algorithm. One algorithm may produce more accurate estimates at a cost
                    of increased memory usage and processing time. It's worth noting that in order to estimate the f0
                    using an auto-correlation function your window size needs to span at least two periods of your
                    frequency. If we are examining human speech and the lower boundary for human speech is approximately
                    40Hz, then we need a window size of at least 50ms to cover two periods.
                </p>
                <MathJax.Provider>
                    <MathJax.Node formula='\frac{2s}{40Hz} * 1000ms = 50ms'/>
                </MathJax.Provider>
                <p>
                    One such algorithm is YIN fundamental frequency estimator[2]. YIN gets it name from philosophical
                    roles of yin and yang which are played out in the algorithm in the form of auto-correlation and
                    cancellation. The YIN algorithm will perform an auto-correlation then attempt to decrease the error
                    by implementing a five step process: applying a difference function, applying a cumulative mean
                    normalized difference function, applying an absolute threshold, parabolic interpolation of local
                    minimums, and finding the best local estimate.
                </p>
                <p>
                    To see the YIN pitch estimator in action, press the button below and record your voice.
                </p>
            </Typography>
            <Pitch/>
            <Typography
                variant='subtitle1'
                color='secondary'
                gutterBottom
            >
                <p>
                    The output of YIN is not exactly intuitive. For starters, silence appears as a straight line. This
                    is a result of Main's hum, often referred to as 60 cycle hum. Electromagnetic interference is
                    recorded in our signal in addition to our speech. The f0 estimation process will double the effect
                    of Main's hum, resulting in noise in our output. Mitigating Main's hum is a trivial task. If we
                    treat it as noise we can normalize and scale our data using a standard scaler. Additionally,
                    the output may contain missing values. These missing values represent areas where the algorithm is
                    not confident in it's estimate. You can minimize the number of missing values by tuning your window
                    size but it may be difficult to completely avoid them. For additional missing values you can perform
                    any number of interpolation techniques.
                </p>
            </Typography>
            <Typography
                variant='h4'
                color='secondary'
            >
                Normalizing f0 Estimates via Min/Max Scaling
            </Typography>
            <Divider/>
            <Typography
                variant='subtitle1'
                color='secondary'
            >
                <p>
                    Human speech can have an f0 ranging from approximately 85Hz to 255Hz. In order for us to compare one
                    person's f0 to another person's we need to normalize the data. In order to normalize our data we are
                    going to perform three steps; 1) pad the data, 2) scale the f0, and 3) scale time.
                </p>
                <p>
                    Machine learning and deep learning algorithms generally have a difficult time handling data samples
                    of variable size. So unless the f0s that we are trying to normalize are the same length, we will
                    need normalize their lengths. Like everything else, there are numerous ways to accomplish this. One
                    way would be to resample the signals to be the same length. Generally if you need to resample
                    signals to normalize them it's preferable to downsample the longer signal as opposed to upsampling
                    the shorter signal. Downsampling is preferred because it is loss-less. With upsampling, not every
                    needed value will be present in the signal so the missing values will need to be interpolated. It's
                    also possible to change the frequency of your signal inadvertently through sampling, so use care
                    when choosing your approach.
                </p>
                <p>
                    For this example we are not going to resample our signals, instead we are going to pad the ends of
                    the shorter signal until it's length matches the longer signal. Padding data is generally a
                    loss-less operation, though it also can change the frequency of your signal if you are not careful.
                    For this example I'll be padding the signal with it's mean value. By using the mean value to pad the
                    signal I can ensure that what I add won't affect the distribution of my data. Additionally I extend
                    the values along the x-axis. Since the x-axis represents time-series data I can easily determine the
                    next x values in either direction by examining the difference in the previous two values.
                </p>
                <p>
                    With padding out of the way we now need to scale our data. The most intuitive way to scale data is
                    to perform a min/max scaling. Min/max scaling works by first finding the minimum and maximum values
                    in the data then for each value in the data we subtract the minimum value then divide by the
                    difference of the maximum and minimum values.
                </p>
                <MathJaxProvider>
                    <MathJaxNode formula='x[i] = \frac{x[i]-min(x)}{max(x)-min(x)}'/>
                </MathJaxProvider>
                <p>
                    The min/max scaler maps the data it is given such that its values will fall in the 0 to 1 range.
                    By applying the scaler to f0 values we are more easily able compare the f0s produced by speakers
                    with drastically different vocal ranges. By applying a min/max scaler to the time values on the
                    x axis we are more easily able to compare speakers who speak at different rates.
                </p>
                <p>
                    Let's visualize two speech samples from our corpus. First we will visualize them without
                    normalization then we will visualize them with normalization.
                </p>
            </Typography>
            {(!error && !loading && data) &&
            <NormalizedTones
                s1={data.corpus[0]}
                s2={data.corpus[1]}
                graphemes={"父母"}
            />
            }
            <Typography
                variant='subtitle1'
                color='secondary'
            >
                <p>
                    In the un-normalized example above both f0s should show a Mandarin tone 4 and a tone 3, but they
                    appear
                    pretty flat. In the normalized example the tones are more pronounced and the phonemes more closely
                    intersect. This same process can be used to normalize a collection of speech samples for use in
                    deep learning algorithms such as speech recognition.
                </p>
            </Typography>
            <br/>
            <Typography
                variant='subtitle2'
                color='secondary'
            >
                <p>
                    [1] Müller, Meinard. Fundamentals of music processing: Audio, analysis, algorithms, applications.
                    Springer, 2015. Page: 305
                    <br/>
                    [2] De Cheveigné, Alain, and Hideki Kawahara. "YIN, a fundamental frequency estimator for speech and
                    music." The Journal of the Acoustical Society of America 111.4 (2002): 1917-1930.
                </p>
            </Typography>
            <Toolbar/>
        </div>
    )
}