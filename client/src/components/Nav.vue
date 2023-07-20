<template>
  <nav>
    <router-link to="/"><h2>GreenConnect</h2></router-link>
    <router-link v-if="!authenticated" to="/login">Se connecter</router-link>
    <router-link v-if="!authenticated" to="/signup">Rejoignez-nous</router-link>
    <router-link v-if="authenticated" to="/profile">Mon profil</router-link>
    <router-link v-if="authenticated" to="/feed">Toutes les actus</router-link>
    <button v-if="authenticated" @click="logout">Se déconnecter</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("jwttoken");
      this.$router.push("/");
      this.authenticated = false;
    },
  },
  created() {
    const token = window.localStorage.getItem("jwttoken");
    if (token) {
      this.authenticated = true;
    }
  },
  
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding-bottom: 1.5rem;
}

h2,
a {
  font-size: 1.2rem;
}

h2 {
  font-weight: 700;
  color: #005959;
}

a {
  color: #0a0c0d;
  cursor: pointer;
}
</style>
