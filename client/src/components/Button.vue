<template>
    <button>
        <v-icon v-if="icon" name="ri-leaf-line" />
       {{ text }}
        </button>
</template>

<script setup>
const props = defineProps(["text", "icon"]);

</script>

<style scoped>

button {
  border-radius: 15px;
  margin: 1rem 0;
  font-size: 1.2rem;
}

</style>