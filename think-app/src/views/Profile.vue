<template>
    <div>
      <div v-if="error" class="thoughts-error-message">Could Not Fetch Data</div>
      <div v-if="documents">
        <ProfleDetails :thoughts="documents" />
      </div>
    </div>
  </template>
  
  <script>
  import ProfleDetails from "@/components/ProfileDetails.vue";
  import getCollection from "@/composables/getCollection";
  
  export default {
    components: {
      ProfleDetails,
    },
    setup() {
      const { error, documents } = getCollection("thoughts");
  
      return { error, documents };
    },
  };
  </script>
  
  <style>
  </style>
  