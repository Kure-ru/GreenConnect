<template>
  <section class="card">
    <div class="stackedcard__top">
      <span>{{ username }}</span>
      <span class="top__date">{{ date }}</span>
    </div>
    <div class="stackedcard-bottom">
      <h4>{{ title }}</h4>
      <p>{{ content }}</p>
    </div>
    <div class="stackedcard__buttons">
      <Button
        :class="selected ? '--selected' : '--unselected'"
        @click="emit('toggle-save-post', props.id)"
        text="sauvegarder"
        icon="true"
      />
    
      <div v-if="authored">
            <v-icon
              @click="deletePost(item.id)"
              class="delete__icon"
              name="io-close"
              scale="1.5"
            />
    </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps([
  "id",
  "username",
  "date",
  "authored",
  "title",
  "content",
  "selected",
]);
const emit = defineEmits(["toggleSavePost"]);
</script>

<script>
import Button from "./Button.vue";

export default {
  components: { Button },
};
</script>

<style scoped>
.card {
width: 50%;
  min-height: 5rem;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 2rem;
  border-radius: 12px;
  background: #fbfaf7;
}

.stackedcard__top {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d8d5cc;
  padding-bottom: 0.5rem;
}

.top__date {
  color: grey;
  font-weight: 400;
  font-size: 0.8rem;
}

.stackedcard-bottom {
  padding-top: 1rem;
}
.stackedcard__buttons{
    display: flex;
    justify-content: flex-end;
}

.--selected {
  background: #005959;
}

.--unselected{
    background: rgb(181, 181, 181);
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

h4 {
  font-size: 1.2rem;
}
</style>
