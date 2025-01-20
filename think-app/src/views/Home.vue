<template>
  <div class="home">
    <header class="home-header">
      <img src="@/assets/logo.png" alt="Hero" />
      <h1>Welcome to the Thoughts Platform!</h1>
      <p>Your space for sharing and exploring thoughts.</p>
      <button @click="goToThoughts">Explore Thoughts</button>
    </header>

    <section class="featured-thoughts">
      <h2>Featured Thoughts</h2>
      <div class="thoughts-list">
        <p>No featured thoughts yet. Start by sharing yours!</p>
      </div>
    </section>

    <footer class="home-footer">
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

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
}

.home-header img {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
}

.home-header h1 {
  font-size: 36px;
  color: var(--primary);
  margin-top: 20px;
}

.home-header p {
  font-size: 18px;
  color: var(--secondary);
  margin-top: 10px;
}

.home-header button {
  padding: 12px 24px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.home-header button:hover {
  background-color: #e55347;
}

.featured-thoughts {
  width: 100%;
  max-width: 1200px;
  margin-top: 60px;
}

.featured-thoughts h2 {
  font-size: 28px;
  color: var(--primary);
  text-align: center;
  margin-bottom: 20px;
}

.featured-thoughts .thoughts-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.home-footer {
  width: 100%;
  text-align: center;
  margin-top: 60px;
  color: #777;
}

.home-footer p {
  font-size: 14px;
}
</style>
