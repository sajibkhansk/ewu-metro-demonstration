
import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config'

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [visitors, setVisitors] = useState(0)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);

    }
    const signWithGoogle = (googleProvider) => {
       return signInWithPopup(auth, googleProvider)
    }
    

    const updateProfileData = (name, photo) => 
    {   
        updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
          }).then(() => {
            // Update successful
          }).catch((error) => {
            // An error occurred
          });
    }
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading,
        updateProfileData,
        signWithGoogle,
        googleProvider,
        setVisitors,
        visitors
    }
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, loggedUser => {
            console.log('logged in user inside auth state observer', loggedUser)
            setUser(loggedUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        } 
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;