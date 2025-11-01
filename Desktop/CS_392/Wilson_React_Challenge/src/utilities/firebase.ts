import { useEffect, useState } from 'react';
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseAuthSignOut,
  type User
} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

type FirebaseEnvKey =
  | 'VITE_FIREBASE_API_KEY'
  | 'VITE_FIREBASE_AUTH_DOMAIN'
  | 'VITE_FIREBASE_DATABASE_URL'
  | 'VITE_FIREBASE_PROJECT_ID'
  | 'VITE_FIREBASE_STORAGE_BUCKET'
  | 'VITE_FIREBASE_MESSAGING_SENDER_ID'
  | 'VITE_FIREBASE_APP_ID';

const getFirebaseEnv = (key: FirebaseEnvKey) => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing Firebase environment variable: ${key}`);
  }
  return value;
};

// Your web app's Firebase configuration (kept in Vite env vars)
const firebaseConfig: FirebaseOptions = {
  apiKey: getFirebaseEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getFirebaseEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  databaseURL: getFirebaseEnv('VITE_FIREBASE_DATABASE_URL'),
  projectId: getFirebaseEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getFirebaseEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getFirebaseEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getFirebaseEnv('VITE_FIREBASE_APP_ID'),
};

if (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  firebaseConfig.measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
}

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const signOut = () => firebaseAuthSignOut(auth);

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, isAuthenticated: Boolean(user), isLoading };
};

export const useDataQuery = <T>(path: string): [T | undefined, boolean, Error | undefined] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);

    const dataRef = ref(database, path);
    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        setData(snapshot.val() as T);
        setLoading(false);
      },
      (firebaseError) => {
        setError(firebaseError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return [data, loading, error];
};

export const updateDataAtPath = async <T extends Record<string, unknown>>(
  path: string,
  payload: Partial<T>
): Promise<void> => {
  const dataRef = ref(database, path);
  await update(dataRef, payload);
};

export const useAdminStatus = (uid: string | null | undefined): {
  isAdmin: boolean;
  isLoading: boolean;
} => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(uid));

  useEffect(() => {
    if (!uid) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const adminRef = ref(database, `admins/${uid}`);
    const unsubscribe = onValue(
      adminRef,
      (snapshot) => {
        setIsAdmin(Boolean(snapshot.val()));
        setIsLoading(false);
      },
      () => {
        setIsAdmin(false);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid]);

  return { isAdmin, isLoading };
};
