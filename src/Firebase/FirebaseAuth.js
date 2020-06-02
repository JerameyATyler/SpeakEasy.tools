import React, {
    useState,
    useEffect,
    useContext,
    createContext
} from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import {CONFIG} from "./FirebaseConfig";

firebase.initializeApp(CONFIG);

const authContext = createContext({});

export function ProvideAuth({children}) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const signIn = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signUp = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
                window.location.reload();
            });
    };

    const sendPasswordResetEmail = email => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (code, password) => {
        return firebase
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true;
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                return user.getIdToken().then(token => firebase.auth().currentUser.getIdTokenResult()
                    .then(result => {
                        if(result.claims['https://hasura.io/jwt/claims']) {
                            return token
                        }
                        const endpoint = 'https://us-central1-speakeasy-263714.cloudfunctions.net/refreshToken'
                        return fetch(`${endpoint}?uid=${user.uid}`).then(res => {
                            if(res.status === 200) {
                                return user.getIdToken(true);
                            }
                            return res.json().then(e => {throw e})
                        })
                    })
                ).then(validToken => {
                    setToken(validToken);
                }).catch(console.error)
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user: user,
        token: token,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
        resetPassword: sendPasswordResetEmail,
        confirmPasswordReset: confirmPasswordReset
    };
}