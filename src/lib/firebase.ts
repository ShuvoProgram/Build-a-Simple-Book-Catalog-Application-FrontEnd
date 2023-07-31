// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBWlwJAiWZOkWXYITAHwW7fjlfbn6QnjcY',
  authDomain: 'book-catalog-164fa.firebaseapp.com',
  projectId: 'book-catalog-164fa',
  storageBucket: 'book-catalog-164fa.appspot.com',
  messagingSenderId: '371671734952',
  appId: '1:371671734952:web:f756c186e81b5f38ab409d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
