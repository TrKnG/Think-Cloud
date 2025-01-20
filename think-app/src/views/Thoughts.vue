<template>
  <div>
    <h1><router-link :to="{ name: 'addthought' }">Add Thought</router-link></h1>
    <div v-if="error" class="error">Could Not Fetch Data</div>
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

<style scoped>
h1 {
  color: var(--primary);
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  transition: color 0.3s ease;
}

h1:hover {
  color: var(--secondary);
  transform: scale(1.05);
}

.error {
  color: var(--warning);
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 12px;
  margin: 20px 0;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.list-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 0 10px;
}

.list-view .thought-item {
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s ease;
}

.list-view .thought-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 1s ease-in-out;
}

.page-transition-enter,
.page-transition-leave-to {
  opacity: 0;
}
</style>