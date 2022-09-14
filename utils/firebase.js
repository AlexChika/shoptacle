// imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

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
const storage = getStorage(app);

// main collection refs
const productsColRef = collection(db, "products");
const customersColRef = collection(db, "customers");
const adminsColRef = collection(db, "admins");

// sub collection refs
function getSubColRef(mainCol, id, subCol) {
  return collection(db, `${mainCol}/${id}/${subCol}`);
}

// doc Refs
function getCustomerDocRef(id) {
  return doc(customersColRef, id);
}
function getProductDocRef(id) {
  return doc(productsColRef, id);
}

// funcs
async function addProduct(data) {
  const resp = await addDoc(productsColRef, data);
}

async function getProduct(id) {
  const ref = getProductDocRef(id);
  const snapshot = await getDoc(ref);
  return snapshot.data();
}

async function updateProduct(productId, data) {
  const ref = getProductDocRef(productId);
  await updateDoc(ref, data);
}

async function deleteProduct(productId) {
  const ref = getProductDocRef(productId);
  await deleteDoc(ref);
}

async function searchProduct(variable, value) {
  let array = [];
  const q = query(productsColRef, where(variable, "==", value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  return array;
}

async function getAllProducts() {
  const snapshot = await getDocs(productsColRef);
  let data = [];
  snapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

async function getAllCustomers() {
  const snapshot = await getDocs(customersColRef);
  let data = [];
  snapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

// add documents to a sub collection
async function addSubDocs(mainCol, id, subCol, data) {
  const ref = getSubColRef(mainCol, id, subCol);
  const resp = await addDoc(ref, data);
}
async function setSubDocs(mainCol, id, subCol, docId, data) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  const resp = await setDoc(ref, data);
}

async function updateSubDocs(mainCol, id, subCol, docId, data) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  await updateDoc(ref, data);
}
async function deleteSubDocs(mainCol, id, subCol, docId) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  await deleteDoc(ref);
}

// get document of a sub document
async function getSubDocs(mainCol, id, subCol) {
  const ref = getSubColRef(mainCol, id, subCol);
  const snapshot = await getDocs(ref);
  let data = [];
  snapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
}

// get updated cart items
async function getCartItem(cart) {
  let cartItems = [];
  for (let i = 0; i < cart.length; i++) {
    const { docId, amount } = cart[i];
    const ref = getProductDocRef(docId);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    cartItems.push({ ...data, amount, id: snapshot.id });
  }
  return cartItems;
}

async function uploadImage(file, path) {
  const imageRef = ref(storage, path);
  const fileSnapshot = await uploadBytesResumable(imageRef, file);
  // then get image url
  const url = await getDownloadURL(imageRef);
  return url;
}

export {
  app,
  auth,
  db,
  productsColRef,
  customersColRef,
  adminsColRef,
  getProductDocRef,
  getCustomerDocRef,
  getSubDocs,
  getCartItem,
  addProduct,
  uploadImage,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllCustomers,
  searchProduct,
  getProduct,
  addSubDocs,
  updateSubDocs,
  deleteSubDocs,
  setSubDocs,
};
