<template>
  <h1>Mon profil</h1>
  <form @submit.prevent="update">
    <div>
      <label for="username">Nom d'utilisateur</label>
      <input id="username" v-model="username" />
    </div>
    <div>
      <label for="interests">Je suis passionné(e) par</label>
      <Chip
        v-for="(interest, index) in interests"
        :key="index"
        :label="interest"
        @remove="removeChip(index)"
      />
      <input
        v-model="interest"
        @keydown.enter.prevent="addInterest"
        placeholder="ajouter un intérêt ↵ "
      />
    </div>
    <Button text="Sauvegarder le profil" type="submit" />
  </form>
  <h2>Mes posts sauvegardés</h2>
  <div class="saved__items">

    <div v-for="post in savedPosts" :key="post.id" class="saved__item">
      <StackedCard
        :id="post.id"
        :username="post.user?.username"
        :title="post.title"
        :content="post.content"
      />
    </div>
  </div>
</template>

<script>
import Chip from "../components/Chip.vue";
import Button from "../components/Button.vue";
import StackedCard from "../components/StackedCard.vue";
import postService from "../services/posts";
import userService from "../services/users";

const id = window.localStorage.getItem("id");
// postService.setToken(token);

export default {
  components: {
    Chip,
    Button,
    StackedCard,
  },
  data() {
    return {
      user: {},
      username: "",
      interests: [],
      interest: "",
      savedPostsId: [],
      savedPosts: [],
    };
  },
  methods: {
    async getUser(userId) {
      try {
        const response = await userService.getUser(userId);
        this.user = response.data;
        this.username = this.user.username;
        this.interests = this.user.interests;
        this.savedPostsId = this.user.savedPosts;
        console.log(`saved ${this.savedPostsId}`);
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },
    async update() {
      try {
        const updatedUser = {
          username: this.username,
          interests: this.interests,
        };
        this.errorMessage = "";
        const response = await userService.update(id, updatedUser);
        this.getUser(id);
      } catch (error) {
        this.errorMessage = "An error occurred";
      }
    },
    async getSavedPosts() {
      try {
        const response = await postService.getAll();
        this.savedPosts = response.filter((post) =>
          this.savedPostsId.includes(post.id)
        );
        console.log(this.savedPosts);
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },

    removeChip(chipNumber) {
      // Handle removing the chip from the list or do other actions
      console.log(`Removing chip ${chipNumber}`);
      this.interests.splice(chipNumber, 1);
    },

    addInterest() {
      if (this.interest.trim() !== "") {
        this.interests.push(this.interest);
        console.log(this.interests);
        this.interest = ""; // Clear the input after adding the interest
      }
    },
  },
  created() {
    this.getUser(id);
    this.getSavedPosts();
  },
};
</script>

<style scoped>
input {
  margin: 1rem 0;
  padding: 1rem;
}

.saved__container {
  display: flex;
  gap: 2.2rem;
  flex-wrap: wrap;
  padding-top: 2rem;
}

.saved__items {
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  border-radius: 20px;
  padding: 1rem;
}

.saved__item {
  flex-basis: 30%;
}

@media (max-width: 768px) {
  .saved__items {

  flex-direction: row-reverse;
}
}
</style>
