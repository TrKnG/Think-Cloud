<template>
  <form @submit.prevent="handleSubmit" class="thought-form">
    <h4>Send your thoughts into the void</h4>
    <input
      type="text"
      required
      placeholder="Your thoughts"
      v-model="thought"
      class="input-field"
    />
    <textarea
      required
      placeholder="Details..."
      v-model="details"
      class="input-field"
    ></textarea>
    <button v-if="!isPending" class="submit-btn">Create</button>
    <button v-else class="submit-btn" disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

export default {
  setup() {
    const { error, addDocument } = useCollection("thoughts");
    const { user } = getUser();
    const router = useRouter();

    const isPending = ref(false);
    const thought = ref("");
    const details = ref("");

    const handleSubmit = async () => {
      isPending.value = true;
      try {
        const userName = user.value.isAnonymous
          ? "Anonymous"
          : user.value.displayName;
        const res = await addDocument({
          thought: thought.value,
          details: details.value,
          userId: user.value.uid,
          userName: userName,
          createdAt: timestamp(),
        });

        isPending.value = false;

        if (!error.value) {
          console.log("Your thought was added successfully:", res);
          router.push({ name: "thoughts" });
        } else {
          console.log("Error adding your thought:", error.value);
        }
      } catch (err) {
        console.error("Error submitting thought:", err);
        isPending.value = false;
      }
    };

    return {
      thought,
      details,
      isPending,
      handleSubmit,
      error,
    };
  },
};
</script>

<style>
</style>
