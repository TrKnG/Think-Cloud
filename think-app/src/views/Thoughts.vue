<template>
  <div>
    <h1 class="thoughts-header">
      <router-link class="add-thought-link" :to="{ name: 'addthought' }">Add Thought</router-link>
    </h1>
    <div v-if="error" class="thoughts-error-message">Could Not Fetch Data</div>
    <div v-if="documents">
      <ListView :thoughts="documents" />
    </div>
  </div>
</template>

<script>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";

export default {
  components: {
    ListView,
  },
  setup() {
    const { error, documents } = getCollection("thoughts");

    return { error, documents };
  },
};
</script>

<style>
</style>
