import gql from "graphql-tag";

const GET_LESSONS = gql`
    {
      lessons {
        category
        chinese
        pinyin
        english
        synonyms
        tone
        audio
        id
        user_id
      }        
    }
`;

const GET_LESSONS_BY_PAGE = gql`    
        query GetLessonsByPage($limit: Int!, $offset: Int!){
        lessons(limit: $limit, offset: $offset) {
            ChineseLessonAudio(limit: 1) {
                phonemes
                wav
            }
            category
            chinese
            pinyin
            english
        }
        lessons_aggregate {
            aggregate {
                count
        }
    }        
}
`;

export {
    GET_LESSONS, GET_LESSONS_BY_PAGE
};