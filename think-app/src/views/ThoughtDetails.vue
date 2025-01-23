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
          <div v-if="thought && user">
            <button
              v-if="ownerShip"
              @click="handleDelete"
              class="thought-details-page__like-button"
            >
              Delete
            </button>
            <!--<button v-else disabled class="thought-details-page__like-button">
              Not Authorized
            </button>-->
          </div>
          <button
            class="thought-details-page__like-button"
            :disabled="hasDisliked"
            @click="handleLike"
          >
            👍 ({{ thought.likes }})
          </button>
          <button
            class="thought-details-page__dislike-button"
            :disabled="hasLiked"
            @click="handleDislike"
          >
            👎 ({{ thought.dislikes }})
          </button>

          <div class="thought-details-page__emojis">
            <button
              v-for="emoji in emojis"
              :key="emoji.id"
              class="thought-details-page__emoji-button"
              :disabled="selectedEmojis.includes(emoji.id)"
              @click="handleEmojiClick(emoji)"
            >
              {{ emoji.symbol }} ({{ emoji.count }})
            </button>
          </div>
        </div>
      </div>

      <div class="thought-details-page__right">
        <h3>Comments</h3>
        <div class="thought-details-page__comments">
          <ul>
            <li v-if="!thought.comments || thought.comments.length === 0">
              <p>
                <strong>No comments has been added yet</strong>
              </p>
            </li>
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
import { watch } from "vue";
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
    const { updateDoc, deleteDoc } = useDocument("thoughts", props.id);
    const router = useRouter();
    const newComment = ref("");

    const emojis = ref([
      { id: 1, symbol: "😂", count: 0 },
      { id: 2, symbol: "😍", count: 0 },
      { id: 4, symbol: "😭", count: 0 },
      { id: 5, symbol: "🔥", count: 0 },
    ]);

    const selectedEmojis = ref([]);

    watch(
      () => thought.value,
      (newThought) => {
        if (newThought) {
          // Backend'den gelen emojileri frontend'e aktar
          emojis.value = newThought.emojis || [
            { id: 1, symbol: "😂", count: 0 },
            { id: 2, symbol: "😍", count: 0 },
            { id: 4, symbol: "😭", count: 0 },
            { id: 5, symbol: "🔥", count: 0 },
          ];

          // Kullanıcının bastığı emojileri backend'den al
          selectedEmojis.value = newThought.emojiUsers?.[user.value.uid] || [];
        }
      },
      { immediate: true } // İlk yüklemede çalışmasını sağla
    );

    const handleEmojiClick = async (emoji) => {
      if (!thought.value.emojiUsers) {
        thought.value.emojiUsers = {};
      }

      // Kullanıcının daha önce bu emojiye bastığını kontrol et
      if (thought.value.emojiUsers[user.value.uid]?.includes(emoji.id)) return;

      // Emoji sayısını artır
      emoji.count++;

      // Kullanıcının bastığı emojiyi kaydet
      thought.value.emojiUsers[user.value.uid] = [
        ...(thought.value.emojiUsers[user.value.uid] || []),
        emoji.id,
      ];

      // Güncellenmiş verileri backend'e kaydet
      await updateDoc({
        ...thought.value,
        emojis: emojis.value.map((e) => ({
          id: e.id,
          symbol: e.symbol,
          count: e.count,
        })),
        emojiUsers: thought.value.emojiUsers,
      });
    };

    const handleDelete = async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this thought?"
      );
      if (!confirmDelete) return; // Exit if the user cancels

      try {
        await deleteDoc(); // Call the delete function
        router.push({ name: "thoughts" }); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting thought:", error);
        // Optionally, set an error message in your component state
      }
    };

    const hasLiked = computed(
      () => thought.value.userLikes?.[user.value.uid] === "liked"
    );
    const hasDisliked = computed(
      () => thought.value.userLikes?.[user.value.uid] === "disliked"
    );

    const handleLike = async () => {
      if (thought.value.userLikes?.[user.value.uid] === "liked") {
        thought.value.likes--;
        thought.value.userLikes[user.value.uid] = null;
      } else {
        if (thought.value.userLikes?.[user.value.uid] === "disliked") {
          thought.value.dislikes--;
        }
        thought.value.likes++;
        thought.value.userLikes[user.value.uid] = "liked";
      }
      await updateDoc(thought.value);
    };

    const handleDislike = async () => {
      if (thought.value.userLikes?.[user.value.uid] === "disliked") {
        thought.value.dislikes--;
        thought.value.userLikes[user.value.uid] = null;
      } else {
        if (thought.value.userLikes?.[user.value.uid] === "liked") {
          thought.value.likes--;
        }
        thought.value.dislikes++;
        thought.value.userLikes[user.value.uid] = "disliked";
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
      emojis,
      selectedEmojis,
      handleEmojiClick,
      handleLike,
      handleDislike,
      hasLiked,
      hasDisliked,
      handleDelete,
      addComment,
      newComment,
      ownerShip,
    };
  },
};
</script>

<style>
</style>
