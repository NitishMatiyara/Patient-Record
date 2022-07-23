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

const patientCollectionRef = collection(db, "patients");
class PatientData {
  addPatients = (newPatient) => {
    return addDoc(patientCollectionRef, newPatient);
  };

  updatePatient = (id, updatedPatient) => {
    const patientDoc = doc(db, "patients", id);
    return updateDoc(patientDoc, updatedPatient);
  };

  deletePatient = (id) => {
    const patientDoc = doc(db, "patients", id);
    return deleteDoc(patientDoc);
  };

  getAllPatients = () => {
    return getDocs(patientCollectionRef);
  };

  getPatient = (id) => {
    const patientDoc = doc(db, "patients", id);
    return getDoc(patientDoc);
  };
}

export default new PatientData();
