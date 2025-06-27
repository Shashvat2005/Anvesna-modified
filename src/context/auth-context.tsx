'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { User } from 'firebase/auth';

// This is a mock context for a non-database version of the app.
// It provides a null user and loading=false state.

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = { user: null, loading: false };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
