<template>
  <div v-if="user" class="profileDetails-profile-page">
    <div class="profileDetails-profile-header">
      <img
        class="profileDetails-profile-photo"
        src="@/assets/logo6.png"
        alt="Profile Picture"
      />
      <div class="profileDetails-profile-info">
        <h2>{{ user.displayName || "Anonymous" }}</h2>
        <p>{{ user.email || "No email available" }}</p>
      </div>
    </div>

    <div class="profileDetails-profile-content">
      <h3>My Thoughts</h3>
      <div v-if="userThoughts.length > 0" class="profileDetails-thoughts-list">
        <div
          v-for="thought in userThoughts"
          :key="thought.id"
          class="profileDetails-thought-item"
        >
          <router-link
            :to="{ name: 'thoughtdetails', params: { id: thought.id } }"
          >
            <h4>{{ thought.thought }}</h4>
            <p>{{ thought.details }}</p>
            <p>
              <strong>Likes:</strong> {{ thought.likes }} |
              <strong>Dislikes:</strong> {{ thought.dislikes }}
            </p>
            <p><strong>Comments:</strong> {{ thought.comments.length }}</p>
            <p class="profileDetails-timestamp">
              Created At: {{ formatDate(thought.createdAt) }}
            </p>
          </router-link>
        </div>
      </div>
      <p v-else>No thoughts posted yet.</p>

      <h3>Liked Thoughts</h3>
      <div
        v-if="userLikedThoughts.length > 0"
        class="profileDetails-liked-thoughts-list"
      >
        <div
          v-for="thought in userLikedThoughts"
          :key="thought.id"
          class="profileDetails-thought-item"
        >
          <router-link
            :to="{ name: 'thoughtdetails', params: { id: thought.id } }"
          >
            <h4>{{ thought.thought }}</h4>
            <p>{{ thought.details }}</p>
            <p>
              <strong>Likes:</strong> {{ thought.likes }} |
              <strong>Dislikes:</strong> {{ thought.dislikes }}
            </p>
            <p class="profileDetails-timestamp">
              Created At: {{ formatDate(thought.createdAt) }}
            </p>
          </router-link>
        </div>
      </div>
      <p v-else>You haven't liked any thoughts yet.</p>

      <h3>My Comments</h3>
      <div v-if="userComments.length > 0" class="profileDetails-comments-list">
        <div
          v-for="comment in userComments"
          :key="comment.id"
          class="profileDetails-comment-item"
        >
          <p><strong>Comment:</strong> {{ comment.text }}</p>
          <p class="profileDetails-timestamp">
            On Thought: {{ comment.thoughtTitle }}
          </p>
        </div>
      </div>
      <p v-else>You haven't commented on any thoughts yet.</p>
    </div>
  </div>
  <div v-else>
    <p>Loading or not logged in...</p>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "@/composables/getUser";
export default {
  props: ["thoughts"],
  setup(props) {
    const { user } = getUser();
    const userThoughts = ref([]);
    const userLikedThoughts = ref([]);
    const userComments = ref([]);

    userThoughts.value = props.thoughts.filter(
      (thought) => thought.userId === user.value.uid
    );

    userLikedThoughts.value = props.thoughts.filter((thought) => {
      return thought.userLikes && user.value.uid in thought.userLikes;
    });

    userComments.value = props.thoughts.flatMap((thought) =>
      thought.comments
        .filter((comment) => comment.userId === user.value.uid)
        .map((comment) => ({
          ...comment,
          thoughtTitle: thought.thought,
        }))
    );

    const formatDate = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString();
    };

    return {
      user,
      userThoughts,
      userLikedThoughts,
      userComments,
      formatDate,
    };
  },
};
</script>

<style>
</style>