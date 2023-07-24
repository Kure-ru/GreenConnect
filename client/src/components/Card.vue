<template>
  <div class="card">
    <div
      @click="emit('toggle-joined-group', props.id)"
      :class="selected ? 'card__mono --selected' : 'card__mono'"
    >
      <v-icon name="ri-leaf-line" />
    </div>
    <div class="card__text">
      <h3>{{ props.title }}</h3>
      <span>{{ props.description }}</span>
    </div>
    <div>
      <img />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["id", "title", "description", "selected"]);
const emit = defineEmits(["toggleJoinedGroups"]);
</script>

<style scoped>
.card {
  max-width: 22.5rem;
  min-height: 5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  background: #fbfaf7;
  gap: .5rem;
  padding: .5rem;
}

.card__mono {
  width: 50px;
  height: 50px;
  background: rgb(196, 195, 195);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.--selected{
    background: #005959;
}

svg {
  fill: white;
}
h3 {
  font-weight: 700;
  font-size: 1.4rem;
}

span {
  font-size: 1rem;
}


</style>
