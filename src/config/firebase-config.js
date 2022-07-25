import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDzTl45RCllLP3kn0MWhiuVL_V-IPEOgBw",

  authDomain: "patient-record-31d63.firebaseapp.com",

  projectId: "patient-record-31d63",

  storageBucket: "patient-record-31d63.appspot.com",

  messagingSenderId: "740922855416",

  appId: "1:740922855416:web:9e2bf8163d5a691da8500d"

};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

enableIndexedDbPersistence(db);

// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//       console.log("New city: ", change.doc.data());
//     }

//     const source = snapshot.metadata.fromCache ? "local cache" : "server";
//     console.log("Data came from " + source);
//   });
// });
