<template>
  <div>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="thought-details" v-else-if="thought">
      <div class="thought-info">
        <div class="cover">
          <img src="@/assets/logo5.png" alt="Logo" />
        </div>
        <h2>{{ thought.thought }}</h2>
        <p class="username">Created by {{ thought.userName }}</p>
        <p class="details">{{ thought.details }}</p>
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

<style scoped>
.thought-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.9)
  );
  border-radius: 8px;
}

.thought-info {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeInUp 1s ease-out;
  backdrop-filter: blur(10px);
}

.cover {
  position: relative;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}

.cover img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(0.5);
  transition: all 0.5s ease;
}

.cover:hover img {
  filter: brightness(0.7);
}

.thought-info h2 {
  font-size: 32px;
  color: #333;
  margin-top: 20px;
  font-weight: bold;
  text-transform: capitalize;
}

.username {
  color: #777;
  font-size: 18px;
  margin-top: 10px;
  font-weight: 400;
}

.details {
  text-align: left;
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #555;
  padding: 0 20px;
}

button {
  padding: 14px 28px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background-color: #e55347;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #ff0000;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .thought-details {
    padding: 40px 15px;
  }

  .thought-info {
    padding: 25px;
  }

  .cover {
    height: 250px;
  }

  button {
    width: 100%;
  }
}
</style>
