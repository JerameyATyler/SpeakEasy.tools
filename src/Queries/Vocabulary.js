import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetVocabulary = word => {
    const VOCABULARY = gql`
        query getVocabulary($word: String!) {
            vocabulary (where: {word: {_eq: $word}}) {
                id
                word
                language {
                    language_label
                }
                native_translations {
                    target_vocabulary {
                        word
                        language {
                            language_label
                        }
                    }
                }
                target_translations {
                    native_vocabulary {
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
        data.vocabulary.forEach(v => {
            if(!(v.language['language_label'] in vocab)) vocab[v.language['language_label']] = new Set();
            vocab[v.language['language_label']].add(v.word);
            v['native_translations'].forEach(vi => {
                if(!(vi['target_vocabulary']['language']['language_label'] in vocab)) vocab[vi['target_vocabulary']['language']['language_label']] = new Set();
                vocab[vi['target_vocabulary']['language']['language_label']].add(vi['target_vocabulary']['word']);
            });
            v['target_translations'].forEach(vi => {
                if(!(vi['native_vocabulary']['language']['language_label'] in vocab)) vocab[vi['native_vocabulary']['language']['language_label']] = new Set();
                vocab[vi['native_vocabulary']['language']['language_label']].add(vi['native_vocabulary']['word']);
            });
        });

        setVocabulary(vocab);
    }, [data]);

    return [vocabulary, loading]
};


