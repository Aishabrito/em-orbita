import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};