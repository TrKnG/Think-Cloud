<template>
  <div class="navbar">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <nav class="navbar-container">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/logo.png" alt="logo" class="navbar-logo" />
        </router-link>
        <div class="navbar-links">
          <h1 class="navbar-link">
            <router-link :to="{ name: 'home' }">Home</router-link>
          </h1>
          <h1 class="navbar-link">
            <router-link :to="{ name: 'aboutus' }">About Us</router-link>
          </h1>
          <div class="navbar-thoughts" v-if="user">
            <h1 class="navbar-link">
              <router-link :to="{ name: 'thoughts' }">Thoughts</router-link>
            </h1>
            <span class="navbar-user" v-if="!user.isAnonymous"
              >Hi, {{ user.displayName }}</span
            >
            <span class="navbar-user" v-else>Hi, Anonymous Person</span>
            <button class="navbar-button" @click="handleClick">Logout</button>
          </div>
          <div class="navbar-sign" v-else>
            <h2 class="navbar-link">
              <router-link :to="{ name: 'login' }">Login</router-link>
            </h2>
            <h2 class="navbar-link">
              <router-link :to="{ name: 'signup' }">Signup</router-link>
            </h2>
          </div>
          <button class="theme-toggle-btn" @click="toggleTheme">
            <i :class="['fa', 'fas', themeIcon]" class="theme-icon"></i>
            <span class="sr-only">Toggle theme</span>
          </button>
          
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import gsap from "gsap";
import {ref} from "vue";

export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    // Tema değiştirme fonksiyonu
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      themeIcon.value = currentTheme === "dark" ? "fa-sun" : "fa-moon"; // Ikon değişimi
    };

    const themeIcon = ref("fa-moon"); // Başlangıçta ay ikonu

    const handleClick = async () => {
      await logout();
      router.push({ name: "login" });
    };

    const beforeEnter = (el) => {
      el.style.transform = "translateY(20px)";
      el.style.opacity = 0;
    };

    const enter = (el, done) => {
      gsap.to(el, {
        duration: 2,
        y: 0,
        opacity: 1,
        ease: "back",
        onComplete: done,
      });
    };

    return { enter, beforeEnter, handleClick, toggleTheme, user, themeIcon };
  },
};

</script>

<style>
</style>
