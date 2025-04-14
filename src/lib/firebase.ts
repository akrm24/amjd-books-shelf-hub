
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBv_o6a0yM5QjajXgu8WZ5igENb2bmnerA",
  authDomain: "amjd-books.firebaseapp.com",
  projectId: "amjd-books",
  storageBucket: "amjd-books.firebasestorage.app",
  messagingSenderId: "409711844632",
  appId: "1:409711844632:web:a3234f0b32406b97ec926d",
  measurementId: "G-VDP5QY6YBT",
  databaseURL: "https://amjd-books-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Authentication Functions
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save additional user info to database
    await set(ref(database, `users/${userCredential.user.uid}`), {
      name,
      email,
      createdAt: new Date().toISOString(),
    });
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Database Functions
export const saveBookPurchase = async (userId: string, bookData: any) => {
  try {
    const purchaseId = Date.now().toString();
    await set(ref(database, `purchases/${userId}/${purchaseId}`), {
      ...bookData,
      purchaseDate: new Date().toISOString(),
    });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserPurchases = async (userId: string) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `purchases/${userId}`));
    if (snapshot.exists()) {
      return { data: snapshot.val(), error: null };
    } else {
      return { data: {}, error: null };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export { app, auth, database, analytics };
