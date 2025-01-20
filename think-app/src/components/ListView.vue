<template>
  <div>
    <div class="container">
      <div v-for="thought in thoughts" :key="thought.id" class="single">
        <div class="thumbnail">
          <img src="@/assets/logo4.png" alt="Logo" />
        </div>
        <router-link
          :to="{ name: 'thoughtdetails', params: { id: thought.id } }"
        >
          <div class="info">
            <h3>{{ thought.thought }}</h3>
            <p>Created by {{ thought.userName }}</p>
          </div>
          <div class="timestamp">
            <p>{{ formatDate(thought.createdAt) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["thoughts"],
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px auto;
  padding: 10px;
  max-width: 1200px;
}
.single {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 300px;
  text-align: center;
}
.single:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}
.thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 15px;
  flex-shrink: 0;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.thumbnail img {
  display: block;
  max-width: 90%;
  max-height: 90%;
  object-fit: cover;
}

.info {
  flex: 1;
  padding: 0.5rem;
}

.info h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
}

.info p {
  font-size: 0.9rem;
  color: #777;
}

.timestamp {
  margin-top: auto;
  font-size: 0.8rem;
  color: #999;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
