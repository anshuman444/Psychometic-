/**
 * Platform Context — VidyaLoop Integration Adapter
 * 
 * This module provides a thin adapter layer between the parent VidyaLoop platform
 * and the Psychometric Intelligence Module.
 * 
 * In production: The parent platform wraps this module with a <PlatformProvider>
 * that supplies the real authenticated user.
 * 
 * In development: A mock user is provided for standalone testing.
 */

import React, { createContext, useContext, useMemo, useState } from 'react';

export interface PlatformUser {
  userId: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'counselor' | 'admin';
  gradeLevel?: number;
  schoolId?: string;
}

interface PlatformContextValue {
  user: PlatformUser;
  isAuthenticated: boolean;
  /** Update the user's display name (collected before assessment) */
  setUserName: (name: string) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

/**
 * Development-only mock user.
 * In production, the parent VidyaLoop platform supplies the real user.
 */
const MOCK_USER: PlatformUser = {
  userId: 'dev-user-001',
  name: '',
  email: 'student@vidyaloop.dev',
  role: 'student',
  gradeLevel: 10,
};

interface PlatformProviderProps {
  children: React.ReactNode;
  /** 
   * Override user for production integration.
   * When the parent platform provides the user, pass it here.
   */
  user?: PlatformUser;
}

export const PlatformProvider: React.FC<PlatformProviderProps> = ({ children, user: externalUser }) => {
  const [userName, setUserName] = useState(externalUser?.name || MOCK_USER.name);
  
  const contextValue = useMemo<PlatformContextValue>(() => ({
    user: {
      ...(externalUser || MOCK_USER),
      name: userName,
    },
    isAuthenticated: true,
    setUserName,
  }), [externalUser, userName]);

  return (
    <PlatformContext.Provider value={contextValue}>
      {children}
    </PlatformContext.Provider>
  );
};

/**
 * Hook to consume the authenticated user from the parent VidyaLoop platform.
 * 
 * Usage:
 * ```ts
 * const { user, setUserName } = useCurrentUser();
 * console.log(user.userId); // Used as FK for assessment data
 * ```
 */
export function useCurrentUser(): PlatformContextValue {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error(
      'useCurrentUser() must be used within a <PlatformProvider>. ' +
      'Ensure the parent VidyaLoop platform wraps this module correctly.'
    );
  }
  return context;
}
