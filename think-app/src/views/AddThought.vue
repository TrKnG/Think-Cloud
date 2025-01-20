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
        const userName = user.value.isAnonymous ? "Anonymous" : user.value.displayName;
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

<style scoped>
.thought-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

.thought-form h4 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  resize: vertical;
  transition: border 0.3s ease, background-color 0.3s ease;
}

.input-field:focus {
  border-color: #1db954;
  background-color: #fff;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #17a34a;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
