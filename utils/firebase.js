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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
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

// func returns Col ref of a sub document
function getSubColRef(mainCol, id, subCol) {
  return collection(db, `${mainCol}/${id}/${subCol}`);
}

// func returns a doc ref (customer)
function getCustomerDocRef(id) {
  return doc(customersColRef, id);
}

// func returns a doc ref (product)
function getProductDocRef(id) {
  return doc(productsColRef, id);
}

// add a document to a collection (product)
async function addProduct(data) {
  const resp = await addDoc(productsColRef, data);
}

// get a document from a collecton (product)
async function getProduct(id) {
  const ref = getProductDocRef(id);
  const snapshot = await getDoc(ref);
  return snapshot.data();
}

// update a document from a collecton (product)
async function updateProduct(productId, data) {
  const ref = getProductDocRef(productId);
  await updateDoc(ref, data);
}

// delete document from a collection (product)
async function deleteProduct(productId) {
  const ref = getProductDocRef(productId);
  await deleteDoc(ref);
}

// search for productssss
async function searchProduct(variable, value) {
  let array = [];
  const q = query(productsColRef, where(variable, "==", value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  return array;
}

// get all documents from a main (customers) collection
async function getAllProducts() {
  const snapshot = await getDocs(productsColRef);
  let data = [];
  snapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

// get all documents from a main (customers) collection
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

// set a document in a sub collection
async function setSubDocs(mainCol, id, subCol, docId, data) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  const resp = await setDoc(ref, data);
}

// update a document from a sub collection
async function updateSubDocs(mainCol, id, subCol, docId, data) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  await updateDoc(ref, data);
}

// delete a document from a sub collection
async function deleteSubDocs(mainCol, id, subCol, docId) {
  const colRef = getSubColRef(mainCol, id, subCol);
  const ref = doc(colRef, docId);
  await deleteDoc(ref);
}

// get document of a sub document..
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

// get updated cart items..
async function getCartItem(cart) {
  let cartItems = [];
  for (let i = 0; i < cart.length; i++) {
    const { docId, amount } = cart[i];
    const ref = getProductDocRef(docId);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    cartItems.push({
      ...data,
      amount: Math.min(data.quantity, amount),
      id: snapshot.id,
    });
  }
  return cartItems;
}

// func for uploading...
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
