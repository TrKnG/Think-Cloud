<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button v-if="isPending">Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log(res);
        console.log("Signup success");
      } else {
        console.log("Signup failed");
        console.log(displayName.value);
        console.log(email.value);
        console.log(password.value);
      }
    };

    return { displayName, email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
button {
  color: #b0b0ff;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: 2px solid #b0b0ff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  outline: none;
}

button:hover {
  background-color: #1db954;
  color: #fff;
  border-color: #1db954;
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  animation: buttonHover 0.4s ease-in-out;
}

@keyframes buttonHover {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

button:focus {
  box-shadow: 0 0 0 4px rgba(29, 185, 84, 0.3);
}

button:disabled {
  background-color: #ccc;
  border-color: #bbb;
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
