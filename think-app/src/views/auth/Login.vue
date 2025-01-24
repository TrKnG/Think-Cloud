<template>
  <div>
    <form class="login-form" @submit.prevent="handleSubmit">
      <h3 class="login-form__title">Login</h3>
      <input
        class="login-form__input"
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="login-form__input"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <div class="login-form__error" v-if="error">{{ error }}</div>
      <button class="login-form__button" v-if="!isPending">Login</button>
      <button
        class="login-form__button login-form__button--loading"
        v-if="isPending"
      >
        Loading
      </button>
    </form>

    <div class="login-anonymous">
      <button
        class="login-anonymous__button"
        :disabled="isPending"
        @click="handleAnonymousLogin"
      >
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

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidInput = (input) => {
      const forbiddenChars = /[<>{}"'&]/;
      return !forbiddenChars.test(input);
    };

    const handleSubmit = async () => {
      if (!isValidEmail(email.value)) {
        error.value = "Invalid email format";
        return;
      }

      if (!isValidInput(password.value)) {
        error.value = "Password contains invalid characters";
        return;
      }

      if (!password.value.trim()) {
        error.value = "Password cannot be empty";
        return;
      }

      try {
        const res = await login(email.value, password.value);
        if (!error.value) {
          console.log(res);
          console.log("Login success");
          router.push({ name: "home" });
        }
      } catch (err) {
        console.log(err);
        error.value = "Login failed";
      }
    };

    const handleAnonymousLogin = async () => {
      isPending.value = true;
      try {
        await loginAnonymously();
        router.push({ name: "home" });
      } catch (err) {
        console.log(err);
        error.value = "Anonymous login failed";
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

<style>
</style>
