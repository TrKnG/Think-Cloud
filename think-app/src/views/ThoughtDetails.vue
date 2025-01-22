<template>
  <div class="thought-details-page">
    <div class="thought-details-page__error" v-if="error">{{ error }}</div>
    <div v-else-if="thought" class="thought-details-page__content">
      <!-- Sol Bölüm -->
      <div class="thought-details-page__left">
        <div class="thought-details-page__cover">
          <img src="@/assets/logo5.png" alt="Logo" />
        </div>
        <h2>{{ thought.thought }}</h2>
        <p class="thought-details-page__username">
          Created by {{ thought.userName }}
        </p>
        <p class="thought-details-page__date">
          Date: {{ formatDate(thought.createdAt) }}
        </p>
        <p class="thought-details-page__details">{{ thought.details }}</p>
        <div class="thought-details-page__likes">
          <button
            class="thought-details-page__like-button"
            :disabled="hasDisliked"
            @click="handleLike"
          >
            👍 Like ({{ thought.likes }})
          </button>
          <button
            class="thought-details-page__dislike-button"
            :disabled="hasLiked"
            @click="handleDislike"
          >
            👎 Dislike ({{ thought.dislikes }})
          </button>
        </div>
      </div>

      <div class="thought-details-page__right">
        <h3>Comments</h3>
        <div class="thought-details-page__comments">
          <ul>
            <li v-for="(comment, index) in thought.comments" :key="index">
              <p>
                <strong>{{ comment.userName }}:</strong> {{ comment.text }}
              </p>
            </li>
          </ul>
        </div>
        <div class="thought-details-page__add-comment">
          <textarea
            v-model="newComment"
            placeholder="Add your comment"
          ></textarea>
          <button @click="addComment">Post Comment</button>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";

export default {
  props: ["id"],
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
  },
  setup(props) {
    const { document: thought, error } = getDocument("thoughts", props.id);
    const { user } = getUser();
    const { updateDoc } = useDocument("thoughts", props.id);
    const router = useRouter();
    const newComment = ref("");

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

    const addComment = async () => {
      if (!newComment.value.trim()) return;
      const comment = {
        userName: user.value?.displayName || "Anonymous",
        text: newComment.value.trim(),
      };
      thought.value.comments = [...(thought.value.comments || []), comment];
      newComment.value = "";
      await updateDoc(thought.value);
    };

    const ownerShip = computed(() => {
      return (
        thought.value && user.value && thought.value.userId === user.value.uid
      );
    });

    return {
      thought,
      error,
      user,
      router,
      ownerShip,
      newComment,
      addComment,
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
