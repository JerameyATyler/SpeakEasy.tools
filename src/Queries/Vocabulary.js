import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetVocabulary = word => {
    const VOCABULARY = gql`
        query getVocabulary($word: String!) {
            vocabulary (where: {word: {_eq: $word}}) {
                translations_1 {
                  id
                  vocabulary_1 {
                    id
                    word
                    language {
                      language_label
                    }
                  }
                  vocabulary_2 {
                    id
                    word
                    language {
                      language_label
                    }
                  }
                }
                translations_2 {
                  id
                  vocabulary_1 {
                    id
                    word
                    language {
                      language_label
                    }
                  }
                  vocabulary_2 {
                    id
                    word
                    language {
                      language_label
                    }
                  }
                }
            }
        }
    `;
    console.log(word)
    const [vocabulary, setVocabulary] = useState(null);
    const {data, loading} = useQuery(VOCABULARY, {
        variables: {
            word: word
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!(data && Boolean(data['vocabulary'].length))) return;
        let d = data['vocabulary'][0];
        let vocab = [];
        if('translations_1' in d) vocab = vocab.concat([...d['translations_1']])
        if('translations_2' in d) vocab = vocab.concat([...d['translations_2']])

        setVocabulary(vocab);
    }, [data]);

    return [vocabulary, loading]
};


