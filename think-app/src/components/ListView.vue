<template>
  <div>
    <div class="listview-container">
      <div v-for="thought in thoughts" :key="thought.id" class="listview-single">
        <div class="listview-thumbnail">
          <img src="@/assets/logo4.png" alt="Logo" />
        </div>
        <router-link
          :to="{ name: 'thoughtdetails', params: { id: thought.id } }"
        >
          <div class="listview-info">
            <h3 class="listview-info__title">{{ thought.thought }}</h3>
            <p class="listview-info__creator">Created by {{ thought.userName }}</p>
          </div>
          <div class="listview-timestamp">
            <p class="listview-info__creator">{{ formatDate(thought.createdAt) }}</p>
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

<style>
</style>
