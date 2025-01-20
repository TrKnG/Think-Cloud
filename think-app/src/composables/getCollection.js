import { ref } from "vue";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const getCollection = (collectionName) => {
  const documents = ref(null);
  const error = ref(null);
  const collectionRef = query(
    collection(projectFirestore, collectionName),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          results.push({ ...data, id: doc.id });
        }
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  return { documents, error, unsubscribe };
};

export default getCollection;
