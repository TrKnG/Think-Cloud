<template>
  <div class="navbar">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <nav>
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/logo.png" alt="logo" class="logo" />
        </router-link>
        <div class="nav-links">
          <h1><router-link :to="{ name: 'home' }">Home</router-link></h1>
          <h1><router-link :to="{ name: 'aboutus' }">About Us</router-link></h1>
          <div class="thoughts" v-if="user">
            <h1>
              <router-link :to="{ name: 'thoughts' }">Thoughts</router-link>
            </h1>
            <span v-if="!user.isAnonymous">Hi, {{ user.displayName }}</span>
            <span v-else>Hi, Anonymous Person</span>
            <button @click="handleClick">Logout</button>
          </div>
          <div class="sign" v-else>
            <h2><router-link :to="{ name: 'login' }">Login</router-link></h2>
            <h2><router-link :to="{ name: 'signup' }">Signup</router-link></h2>
          </div>
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

export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      console.log("Logout success");
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

    return { enter, beforeEnter, handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  background-color: #1e1e2f;
  color: #e0e0e0;
  padding: 10px 20px;
  margin-bottom: 60px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid #3e3e5e;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

nav .logo {
  width: 40px;
  height: auto;
  margin-right: 10px;
  cursor: pointer;
}

nav .nav-links {
  display: flex;
  align-items: center;
  gap: 25px;
}

nav h1 {
  font-size: 18px;
  margin: 0;
  color: #a0a0c0;
  text-transform: capitalize;
  font-weight: 500;
}

nav a {
  text-decoration: none;
  color: inherit;
}

button {
  color: #b0b0ff;
  background-color: transparent;
  font-size: 14px;
  padding: 6px 12px;
  border: 1px solid #b0b0ff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #3e3e5e;
  color: #fff;
  border-color: #3e3e5e;
}

span {
  margin-right: 16px;
  font-size: 14px;
  padding-right: 16px;
  border-right: 1px solid #555;
  color: #bbb;
}

.sign h2 {
  margin-left: 10px;
  font-size: 18px;
}

.thoughts {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    text-align: center;
  }

  .nav-links {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
}
</style>
