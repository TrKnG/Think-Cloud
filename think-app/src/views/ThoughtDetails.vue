<template>
  <div>
    <div class="thought-details-page__error" v-if="error">{{ error }}</div>
    <div class="thought-details-page__thought-details" v-else-if="thought">
      <div class="thought-details-page__thought-info">
        <div class="thought-details-page__cover">
          <img src="@/assets/logo5.png" alt="Logo" />
        </div>
        <h2>{{ thought.thought }}</h2>
        <p class="thought-details-page__username">Created by {{ thought.userName }}</p>
        <p class="thought-details-page__details">{{ thought.details }}</p>
        <div v-if="thought && user">
          <button v-if="ownerShip" @click="handleDelete">Delete</button>
          <button v-else disabled>Not Authorized</button>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>


<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";

export default {
  props: ["id"],
  setup(props) {
    const {
      document: thought,
      error,
      loading,
    } = getDocument("thoughts", props.id);
    const { user } = getUser();
    const { deleteDoc } = useDocument("thoughts", props.id);
    const router = useRouter();

    const handleDelete = async () => {
      await deleteDoc();
      router.push({ name: "thoughts" });
    };
    const ownerShip = computed(() => {
      if (thought.value.userName === "Anonymous" && user.value.isAnonymous) {
        return true;
      } else {
        return (
          thought.value && user.value && user.value.uid === thought.value.userId
        );
      }
    });

    return {
      thought,
      error,
      loading,
      ownerShip,
      user,
      handleDelete,
    };
  },
};
</script>

<style>
</style>
