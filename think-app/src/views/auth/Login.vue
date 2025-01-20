<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div class="error" v-if="error">{{ error }}</div>
      <button v-if="!isPending">Login</button>
      <button v-if="isPending">Loading</button>
    </form>
    <div class="login-anonymous">
      <button :disabled="isPending" @click="handleAnonymousLogin">
        {{ isPending ? "Loading..." : "Login Anonymous" }}
      </button>
    </div>
  </div>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import useLoginA from "@/composables/useLoginA";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const { loginAnonymously } = useLoginA();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log(res);
        console.log("Login success");
        router.push({ name: "home" });
      }
    };

    const handleAnonymousLogin = async () => {
      isPending.value = true;
      try {
        await loginAnonymously();
        console.log("Anonim giriş başarılı");
        router.push({ name: "home" });
      } catch (err) {
        console.log(err);
        error.value = "Anonim giriş başarısız";
      } finally {
        isPending.value = false;
      }
    };

    return {
      email,
      password,
      handleSubmit,
      handleAnonymousLogin,
      error,
      isPending,
    };
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

.login-anonymous {
  margin-top: 20px;
}

.login-anonymous button {
  color: #b0b0ff;
  background-color: transparent;
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid #b0b0ff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-anonymous button:hover {
  background-color: #1db954;
  color: #fff;
  border-color: #1db954;
}
</style>
