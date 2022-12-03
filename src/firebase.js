import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDBJgCxr6wk_xe7Gn93-zJSnRZ7fkmTKwI",
    authDomain: "nwitter-7c435.firebaseapp.com",
    // databaseURL: "https://nwitter-7c435.firebaseio.com",
    projectId: "nwitter-7c435",
    storageBucket: "nwitter-7c435.appspot.com",
    messagingSenderId: "963294864440",
    appId: "1:963294864440:web:6dcba7014276f483cab2cd"
};

const app = initializeApp(firebaseConfig);

export default app;