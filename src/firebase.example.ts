import firebase from 'firebase/app';
import 'firebase/analytics';

/**
 * Production config
 */
let config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  /**
   * Development config
   */
  config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  };
}

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
