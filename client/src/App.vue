<script setup>
import Nav from "./components/Nav.vue";
</script>

<template>
  <Nav />
  <router-view />
</template>

<style>
body {
  display: flex;
  flex-direction: column;
}
</style>
