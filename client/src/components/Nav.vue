<script setup></script>

<template>
  <nav>
    <router-link to="/"><h2>GreenConnect</h2></router-link>
    <router-link to="/login">Se connecter</router-link>
    <router-link to="/signup">Rejoignez-nous</router-link>
    <router-link to="/profile">Mon profil</router-link>
    <button @click="logout">Se déconnecter</button>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      window.localStorage.removeItem("jwttoken");
      this.$router.push("/"); 
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
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
