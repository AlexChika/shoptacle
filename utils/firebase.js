// imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRDLu2rHp703rAf8OLDb57QYvvEOCnZGQ",
  authDomain: "shoptacle-676a3.firebaseapp.com",
  projectId: "shoptacle-676a3",
  storageBucket: "shoptacle-676a3.appspot.com",
  messagingSenderId: "1096229491593",
  appId: "1:1096229491593:web:0256decae2e2c4be174758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //auth
const db = getFirestore(app);

// main collection refs
const productsColRef = collection(db, "products");
const customersColRef = collection(db, "customers");
const adminsColRef = collection(db, "admins");

// sub collection refs
function getRatingsColRef(id) {
  return collection(db, `products/${id}/ratings`);
}
function getOrdersColRef(id) {
  return collection(db, `customers/${id}/orders`);
}
function getReviewsColRef(id) {
  return collection(db, `customers/${id}/reviews`);
}

// doc Refs
function getCustomerDocRef(id) {
  return doc(customersColRef, id);
}
function getProductDocRef(id) {
  return doc(productsColRef, id);
}

// const storage =
export {
  app,
  auth,
  db,
  productsColRef,
  customersColRef,
  adminsColRef,
  getProductDocRef,
  getCustomerDocRef,
  getRatingsColRef,
  getOrdersColRef,
  getReviewsColRef,
};
