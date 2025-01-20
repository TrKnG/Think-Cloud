import { ref } from "vue";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const documentRef = doc(projectFirestore, collection, id);

  const deleteDocFunc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      await deleteDoc(documentRef);
      isPending.value = false;
    } catch (err) {
      console.error(err.message);
      error.value = "Could not delete the document";
      isPending.value = false;
    }
  };

  const updateDocFunc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      await updateDoc(documentRef, updates);
      isPending.value = false;
    } catch (err) {
      console.error(err.message);
      error.value = "Could not update the document";
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDoc: deleteDocFunc, updateDoc: updateDocFunc };
};

export default useDocument;
