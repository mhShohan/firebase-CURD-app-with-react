import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAJzxwIz6CgnywrJZtrmlWmipNHtN1km_k',
    authDomain: 'crud-app-firebase-react.firebaseapp.com',
    projectId: 'crud-app-firebase-react',
    storageBucket: 'crud-app-firebase-react.appspot.com',
    messagingSenderId: '796385934568',
    appId: '1:796385934568:web:d6b8804d92c5690e1d5d5d',
    measurementId: 'G-G2QZGH4M3S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
