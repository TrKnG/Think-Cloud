import { ref } from "vue";
import { getAuth, signInAnonymously } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const loginAnonymously = async () => {
  error.value = null;
  isPending.value = true;

  const auth = getAuth();

  try {
    const res = await signInAnonymously(auth);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Anonim giriş başarısız";
    isPending.value = false;
  }
};

const useLoginA = () => {
  return { error, loginAnonymously, isPending };
};

export default useLoginA;
