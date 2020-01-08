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

export {
    GET_LESSONS
};