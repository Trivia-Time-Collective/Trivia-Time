import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDW2mTnzhvLu9t7acn6Hk7tzK849VwmiyE',
  authDomain: 'triviatime-6ee75.firebaseapp.com',
  projectId: 'triviatime-6ee75',
  storageBucket: 'triviatime-6ee75.appspot.com',
  messagingSenderId: '1059930928996',
  appId: '1:1059930928996:web:b4da9d4083d43b38bc2c71',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
