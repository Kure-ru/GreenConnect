<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h3>Nouveau groupe</h3>
      <form @submit.prevent="newGroup">
        <div>
          <label for="title">Nom du groupe</label>
          <input v-model="title" minlength="5" required />
        </div>
        <div>
          <label for="description">Description</label>
          <input v-model="description" minlength="10" required />
        </div>
        <div class="modal__btn__container">
          <Button type="submit" text="Valider"/>
          <Button  @click="$emit('close-modal')" id="cancel" type="button" text="Annuler"/>
        </div>
      </form>
    </div>
    <div class="close"></div>
  </div>
</template>

<script>
import groupService from "../services/groups";
import Button from "./Button.vue";

const token = window.localStorage.getItem("jwttoken");
groupService.setToken(token);

export default {
  components: {
    Button
  },
  data() {
    return {
      title: "",
      description: "",
      errorMessage: "",
    };
  },
  methods: {
    async newGroup() {
      try {
        this.errorMessage = "";
        if (this.title && this.description) {
          const group = await groupService.createGroup({
            title: this.title,
            description: this.description,
          });
          this.title = "";
          this.description = "";
          this.$emit("close-modal");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error || "An error occurred";
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  padding: 2rem;
}

form {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
}

label {
  text-align: left;
}

#cancel {
  background: rgb(181, 181, 181);
}

.modal__btn__container{
  display: flex;
  justify-content: space-evenly;
}
</style>
