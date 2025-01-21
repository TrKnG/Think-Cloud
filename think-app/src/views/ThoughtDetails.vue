<template>
  <div>
    <div class="thought-details-page__error" v-if="error">{{ error }}</div>
    <div class="thought-details-page__thought-details" v-else-if="thought">
      <div class="thought-details-page__thought-info">
        <div class="thought-details-page__cover">
          <img src="@/assets/logo5.png" alt="Logo" />
        </div>
        <h2>{{ thought.thought }}</h2>
        <p class="thought-details-page__username">
          Created by {{ thought.userName }}
        </p>
        <p class="thought-details-page__details">{{ thought.details }}</p>

        <div class="thought-details-page__likes">
          <button
            class="like-button"
            :disabled="hasDisliked"
            @click="handleLike"
          >
            👍 Like ({{ thought.likes }})
          </button>
          <button
            class="dislike-button"
            :disabled="hasLiked"
            @click="handleDislike"
          >
            👎 Dislike ({{ thought.dislikes }})
          </button>
        </div>

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
    const { updateDoc } = useDocument("thoughts", props.id);
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

    const hasLiked = computed(
      () => thought.value.userLikes?.[user.value.uid] === "liked"
    );
    const hasDisliked = computed(
      () => thought.value.userLikes?.[user.value.uid] === "disliked"
    );

    const handleLike = async () => {
      if (hasLiked.value) {
        thought.value.likes--;
        thought.value.userLikes = {
          ...thought.value.userLikes,
          [user.value.uid]: null,
        };
      } else {
        if (hasDisliked.value) {
          thought.value.dislikes--;
        }
        thought.value.likes++;
        thought.value.userLikes = {
          ...thought.value.userLikes,
          [user.value.uid]: "liked",
        };
      }
      await updateDoc(thought.value);
    };

    const handleDislike = async () => {
      if (hasDisliked.value) {
        thought.value.dislikes--;
        thought.value.userLikes = {
          ...thought.value.userLikes,
          [user.value.uid]: null,
        };
      } else {
        if (hasLiked.value) {
          thought.value.likes--;
        }
        thought.value.dislikes++;
        thought.value.userLikes = {
          ...thought.value.userLikes,
          [user.value.uid]: "disliked",
        };
      }
      await updateDoc(thought.value);
    };

    return {
      thought,
      error,
      loading,
      ownerShip,
      user,
      handleDelete,
      handleLike,
      handleDislike,
      hasLiked,
      hasDisliked,
    };
  },
};
</script>

<style>
</style>
