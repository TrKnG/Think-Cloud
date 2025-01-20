import { ref, onUnmounted } from "vue";
import { doc, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const documentRef = doc(projectFirestore, collection, id);

  const unsubscribe = onSnapshot(
    documentRef,
    (docSnap) => {
      if (docSnap.exists()) {
        document.value = { ...docSnap.data(), id: docSnap.id };
        error.value = null;
      } else {
        document.value = null;
        error.value = "That document does not exist";
      }
      loading.value = false;
    },
    (err) => {
      console.error("Error fetching document:", err.message);
      error.value = "Could not fetch the data";
      loading.value = false;
    }
  );

  onUnmounted(() => {
    unsubscribe();
  });

  return { document, error, loading };
};

export default getDocument;
