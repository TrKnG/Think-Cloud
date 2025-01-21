import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDSeqlZ_oVH3eXSyOzI-ONpv0AaCo1f33s",
  authDomain: "think-cloud-ce46c.firebaseapp.com",
  projectId: "think-cloud-ce46c",
  storageBucket: "think-cloud-ce46c.appspot.com",
  messagingSenderId: "912568449979",
  appId: "1:912568449979:web:234b841b9b6031a326629e",
  measurementId: "G-L4TW60KEG7",
};

const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);
const projectAnalytics = getAnalytics(app);
const timestamp = serverTimestamp;

export { projectAuth, projectFirestore, timestamp, projectAnalytics };
