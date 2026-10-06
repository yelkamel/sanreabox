import { createContext, use, useState, type PropsWithChildren } from 'react';

export type User = {
  name: string;
  email: string;
  photoUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  hasOnboarded: boolean;
  completeOnboarding: () => void;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Interface only: there is no backend yet, so the session lives in memory and
 * any credentials are accepted. Swap the bodies of `signIn` / `signUp` /
 * `signOut` for real calls when a service is connected.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const value: AuthContextValue = {
    user,
    hasOnboarded,
    completeOnboarding: () => setHasOnboarded(true),
    signIn: (email) =>
      setUser({
        name: nameFromEmail(email),
        email,
        photoUrl: 'https://i.pravatar.cc/200?img=12',
      }),
    signUp: (name, email) => setUser({ name, email }),
    signOut: () => setUser(null),
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return value;
}

function nameFromEmail(email: string) {
  const local = email.split('@')[0] ?? '';
  const words = local.split(/[._-]+/).filter(Boolean);
  if (words.length === 0) return 'Utilisateur';
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}
