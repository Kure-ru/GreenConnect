<template>
  <nav>
    <router-link to="/"><h2>GreenConnect</h2></router-link>
    <HamburgerMenu />
  </nav>
</template>

<script>
import HamburgerMenu from "./HamburgerMenu.vue";

export default {
  components: { HamburgerMenu },
};
</script>

<style scoped>
nav {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding-bottom: 1.5rem;
}

h2,
a {
  font-size: 1.2rem;
}

h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #005959;
}


</style>
