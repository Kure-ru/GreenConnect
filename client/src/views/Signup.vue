<template>
  <div class="login-container">
    <h1>Deviens un <span>Greener</span> </h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirme ton mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          required
        />
      </div>

      <button type="submit">Se connecter</button>
    </form>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import router from "../router";
import postService from "../services/posts";
import userService from "../services/users";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async signup() {
      try {
        if (this.username && this.password === this.confirmPassword) {
          this.errorMessage = "";
          const user = {
            username: this.username,
            password: this.password,
          };
          const response = await userService.create(user);
          // redirect to feed page
          router.push("/login");
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
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 10px 0;
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
