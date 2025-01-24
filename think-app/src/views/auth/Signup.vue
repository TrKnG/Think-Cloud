<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h3 class="signup-form__title">Signup</h3>
    <input
      class="signup-form__input"
      type="text"
      placeholder="Display Name"
      v-model="displayName"
    />
    <input
      class="signup-form__input"
      type="email"
      placeholder="Email"
      v-model="email"
    />
    <input
      class="signup-form__input"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <div class="signup-form__error" v-if="error">{{ error }}</div>
    <button class="signup-form__button" v-if="!isPending">Signup</button>
    <button
      class="signup-form__button signup-form__button--loading"
      v-if="isPending"
    >
      Loading
    </button>
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

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidInput = (input) => {
      const forbiddenChars = /[<>{}"'&]/;
      return !forbiddenChars.test(input);
    };

    const handleSubmit = async () => {
      if (!displayName.value.trim()) {
        error.value = "Display Name cannot be empty";
        return;
      }

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
        const res = await signup(
          email.value,
          password.value,
          displayName.value
        );
        if (!error.value) {
          console.log("Signup success");
        } else {
          console.log("Signup failed");
        }
      } catch (err) {
        console.log(err);
        error.value = "Signup failed";
      }
    };

    return { displayName, email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
</style>
