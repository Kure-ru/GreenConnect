<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Se connecter</button>
    </form>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import postService from "../services/posts";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        if (this.username && this.password) {
          this.errorMessage = "";
          const response = await axios.post("/users/login", {
            username: this.username,
            password: this.password,
          });

          // store the token in local storage
          const token = response.data.token;
          window.localStorage.setItem("jwttoken", token);
          postService.setToken(token);
          // redirect to feed page
          router.push("/feed");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error || "An error occurred";
      }
    },
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 10px;
}

button {
  padding: 10px 20px;
  background-color: #005959;
  color: #fff;
  border: none;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
