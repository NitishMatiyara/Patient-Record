import { db } from "../config/firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const opdCollectionRef = collection(db, "opdFindings");
class OpdData {
  addOpd = (newOpd) => {
    return addDoc(opdCollectionRef, newOpd);
  };

  updateOpd = (id, updatedOpd) => {
    const opdDoc = doc(db, "opdFindings", id);
    return updateDoc(opdDoc, updatedOpd);
  };

  deleteOpd = (id) => {
    const opdDoc = doc(db, "opdFindings", id);
    return deleteDoc(opdDoc);
  };

  getAllOpd = () => {
    return getDocs(opdCollectionRef);
  };

  getOpd = (id) => {
    const opdDoc = doc(db, "opdFindings", id);
    return getDoc(opdDoc);
  };
}

export default new OpdData();
