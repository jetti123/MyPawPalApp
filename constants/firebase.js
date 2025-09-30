// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPtopK9R_fOm4OHd8GVVMMhHPGr6oMyNI",
  authDomain: "mypawpalapp.firebaseapp.com",
  projectId: "mypawpalapp",
  storageBucket: "mypawpalapp.firebasestorage.app",
  messagingSenderId: "512288156338",
  appId: "1:512288156338:web:987c03d35a2e80fd8e37ab"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { db, auth };
