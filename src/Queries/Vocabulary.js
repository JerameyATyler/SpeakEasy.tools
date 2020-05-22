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

    const [vocabulary, setVocabulary] = useState(null);
    const {data, loading} = useQuery(VOCABULARY, {
        variables: {
            word: word
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        let vocab = {};
        data['vocabulary'].forEach(v => {
            console.log(v);
        });

        setVocabulary(vocab);
    }, [data]);

    return [vocabulary, loading]
};


