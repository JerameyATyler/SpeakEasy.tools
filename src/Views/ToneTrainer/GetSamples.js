import {useQuery} from "@apollo/react-hooks";
import {GET_LESSONS_BY_PAGE} from "../../Queries/Lessons";

export default ({page}) => {
    const formatSample = (s) => {
        return {
            graphemes: s.chinese,
            pinyin: s.pinyin,
            english: s.english,
            sampleRate: s.ChineseLessonAudio[0].wav.samplerate,
            phonemes: s.ChineseLessonAudio[0].phonemes.phonemes,
            wav: s.ChineseLessonAudio[0].wav.data,
        };
    };

    const {loading, error, data} = useQuery(GET_LESSONS_BY_PAGE, {
        variables: {limit: 5, offset: page},
        fetchPolicy: "cache-and-network"
    });

    if (loading || error) return;
    if (data) return {
        samples: data.lessons.map(l => formatSample(l)),
        totalSamples: data.lessons_aggregate.aggregate.count
    };
}