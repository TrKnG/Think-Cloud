<template>
  <div class="home-page">
    <header class="home-page-header">
      <img src="@/assets/logo.png" alt="Hero" />
      <h1>Welcome to the Thoughts Platform!</h1>
      <p>Your space for sharing and exploring thoughts.</p>
      <button @click="goToThoughts">Explore Thoughts</button>
    </header>

    <section class="home-page-featured-thoughts">
      <h2>Featured Thoughts</h2>
      <div class="home-page-thoughts-list">
        <p>No featured thoughts yet. Start by sharing yours!</p>
      </div>
    </section>

    <footer class="home-page-footer">
      <p>© 2025 Thoughts Platform. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goToThoughts = () => {
      router.push({ name: "thoughts" });
    };

    return {
      goToThoughts,
    };
  },
};
</script>

<style>
</style>
