import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => auth.signOut(auth);

  const resetPasswordWithEmail = (email) => {
    const reset = auth.sendPasswordResetEmail(auth, email);
    return reset;
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const reset = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubs();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        login,
        user,
        logout,
        loading,
        googleLogin,
        reset,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
