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
        placeholder="Ajouter un intérêt"
      />
    </div>
    <button type="submit">Sauvegarder le profil</button>
  </form>
  <div>
    <h2>Mes posts</h2>
  </div>
</template>

<script>
import { toRaw } from "@vue/reactivity";
import Chip from '../components/Chip.vue';
import postService from "../services/posts";
import userService from "../services/users";

const id = window.localStorage.getItem("id");
// postService.setToken(token);

export default {
    components: {
    Chip,
  },
  data() {
    return {
      user: {},
      username: "",
      interests: [],
      interest: "",
    };
  },
  methods: {
    async getUser(userId) {
      try {
        const response = await userService.getUser(userId);
        this.user = response.data;
        this.username = this.user.username;
        this.interests = this.user.interests;
        console.log(`interests ${this.interests}`)
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },
    async update() {
      try {
        const updatedUser = {
            username: this.username,
            interests: this.interests
        }
          this.errorMessage = "";
          const response = await userService.update(id, updatedUser)
          this.getUser(id);
      } catch (error) {
        this.errorMessage = "An error occurred";
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
        console.log(this.interests)
        this.interest = ""; // Clear the input after adding the interest
      }
    },
  },
  created() {
    this.getUser(id);
    console.log('initialized...', toRaw(this.username), toRaw(this.interests));
  },
};
</script>
