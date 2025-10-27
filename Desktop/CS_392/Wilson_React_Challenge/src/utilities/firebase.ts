// Import the functions you need from the SDKs you need
import { useEffect, useState } from 'react';
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

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

export const writeDataAtPath = async <T>(path: string, payload: T): Promise<void> => {
  const dataRef = ref(database, path);
  await set(dataRef, payload);
};
