import React, { createContext, useContext, useEffect, useState } from 'react';
    import {
      User,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      GoogleAuthProvider,
      signInWithPopup
    } from 'firebase/auth';
    import { auth, db } from '../lib/firebase';
    import { doc, setDoc, getDoc } from 'firebase/firestore';

    interface AuthContextType {
      currentUser: User | null;
      loading: boolean;
      signUp: (email: string, password: string, username: string) => Promise<void>;
      signIn: (email: string, password: string) => Promise<void>;
      signInWithGoogle: () => Promise<void>;
      logout: () => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType | null>(null);

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [currentUser, setCurrentUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      const createUserProfile = async (user: User, username?: string) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Prioritize provided username, then Google displayName, then email prefix, then "Anonymous"
          const finalUsername = username || user.displayName || user.email?.split('@')[0] || 'Anonymous';

          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || finalUsername, // Keep displayName for consistency
            username: finalUsername, // Add the username field
            createdAt: new Date().toISOString(),
            listings: [],
            purchases: [],
          });
        }
      };

      const signUp = async (email: string, password: string, username: string) => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(user, username);
      };

      const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
      };

      const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        await createUserProfile(user); // No username passed - createUserProfile handles it
      };

      const logout = () => signOut(auth);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });

        return unsubscribe;
      }, []);

      const value = {
        currentUser,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
      };

      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };
