// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi55QtKYSbqUWvQFGG-SBVnwu5TvJeRhc',
  authDomain: 'command-center-eda05.firebaseapp.com',
  projectId: 'command-center-eda05',
  storageBucket: 'command-center-eda05.appspot.com',
  messagingSenderId: '732218787602',
  appId: '1:732218787602:web:9f3c23cf33792f8184d5cb',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
