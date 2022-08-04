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

const paymentCollectionRef = collection(db, "payments");
class PaymentData {
  addPayments = (newPayment) => {
    return addDoc(paymentCollectionRef, newPayment);
  };

  updatePayment = (id, updatedPayment) => {
    const paymentDoc = doc(db, "payments", id);
    return updateDoc(paymentDoc, updatedPayment);
  };

  deletePayment = (id) => {
    const paymentDoc = doc(db, "payments", id);
    return deleteDoc(paymentDoc);
  };

  getAllPayments = () => {
    return getDocs(paymentCollectionRef);
  };

  getPayment = (id) => {
    const paymentDoc = doc(db, "payments", id);
    return getDoc(paymentDoc);
  };
}

export default new PaymentData();
