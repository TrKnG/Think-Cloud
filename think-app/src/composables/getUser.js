import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "../firebase/config";

const user = ref(null);

onAuthStateChanged(projectAuth, (_user) => {
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
