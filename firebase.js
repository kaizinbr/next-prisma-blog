import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_1P6nARptk5zSXUTblvTkK5-rxWHbm88",
  authDomain: "blog-img-a2e09.firebaseapp.com",
  projectId: "blog-img-a2e09",
  storageBucket: "blog-img-a2e09.appspot.com",
  messagingSenderId: "1024549598632",
  appId: "1:1024549598632:web:ba0aa9686455cfd937999d",
  measurementId: "G-6M1D9YKSD3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);