import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyChe4eg7li4Aat2-huQ6aUtG-f5oB5RSYY",
  authDomain: "patient-record-app-ae41d.firebaseapp.com",
  databaseURL: "https://patient-record-app-ae41d-default-rtdb.firebaseio.com",
  projectId: "patient-record-app-ae41d",
  storageBucket: "patient-record-app-ae41d.appspot.com",
  messagingSenderId: "476187529915",
  appId: "1:476187529915:web:d3c0954e819dfcb3404f9e"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
