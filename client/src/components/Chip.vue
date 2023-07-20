<template>
    <div class="chip" @click="handleClick">
      <span>{{ label }}</span>
      <button @click.stop="$emit('remove')">✕</button>
    </div>
  </template>
  
  <script setup>
  const { props } = defineProps(['label']);
  </script>
  
  <style scoped>
  .chip {
    display: inline-block;
    background: white;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    cursor: pointer;
  }

  .chip:hover{
    background: rgb(195, 195, 195);
  }
  
  button {
    background-color: transparent;
    color: #007bff;
    border: none;
    font-size: 14px;
    margin-left: 5px;
    padding: 0;
  }
  </style>