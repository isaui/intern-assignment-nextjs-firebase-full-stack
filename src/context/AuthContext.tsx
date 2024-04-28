"use client"
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { AuthContextType } from './type';
import { toast } from 'react-toastify';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              
              setUser(user);
          } else {
              setUser(null);
          }
      });
  
      return () => unsubscribe();
  }, []);
  
    return (
      <AuthContext.Provider value={{user}}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Auth Provider');
  }
  return context;
};