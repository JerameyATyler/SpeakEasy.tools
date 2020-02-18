import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

const PAGINATE_LESSONS = gql`
    query PaginateLessons($lessonLimit: Int!, $lessonOffset: Int!, $sampleLimit: Int!,$sampleOffset: Int!) {
        lessons(limit: $lessonLimit, offset: $lessonOffset) {
            ChineseLessonAudio(limit: $sampleLimit, offset: $sampleOffset) {
                id
                graphemes                
                phonemes
                wav
                is_good
            }
            id
            category
            chinese
            pinyin
            english
            synonyms
            tone
        }
        lessons_aggregate {
            aggregate {
                count
            }
        }
    }
`;

export default ({lessonLimit = 5, lessonPage = 0, sampleLimit = 5, samplePage = 0}) => {
    const formatSample = (s) => {
        return {
            id: s.id,
            category: s.category,
            chinese: s.chinese,
            pinyin: s.pinyin,
            english: s.english,
            synonyms: s.synonyms,
            tone: s.tone,
            samples: s.ChineseLessonAudio.map(c => {
                return {
                    id: c.id,
                    graphemes: c.graphemes,
                    phonemes: c.phonemes.phonemes,
                    english: s.english,
                    pinyin: s.pinyin,
                    wav: c.wav.data,
                    sampleRate: c.wav.samplerate,
                    isGood: c.is_good,
                }
            })
        };
    };

    const {data} = useQuery(PAGINATE_LESSONS, {
        variables: {
            lessonLimit: lessonLimit,
            lessonOffset: lessonLimit * lessonPage,
            sampleLimit: sampleLimit,
            sampleOffset: sampleLimit * samplePage
        },
        fetchPolicy: "cache-and-network"
    });

    if (data) return {
        lessons: data.lessons.map(l => formatSample(l)),
        totalLessons: data.lessons_aggregate.aggregate.count
    };
    else return {lessons: [], totalLessons: 0};
}