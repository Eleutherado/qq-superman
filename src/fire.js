import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyCTcS7aSXbWXzWJ_E145PokQGlnffstbhQ',
  authDomain: 'qqsuperman-bb324.firebaseapp.com',
  databaseURL: 'https://qqsuperman-bb324.firebaseio.com',
  projectId: 'qqsuperman-bb324',
  storageBucket: 'qqsuperman-bb324.appspot.com',
  messagingSenderId: '679186717391'
};
const fire = firebase.initializeApp(config);
export default fire;
