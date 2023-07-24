<template>
  <main>
    <h1>Groupes</h1>
    <section class="groups__container">
      <div v-for="group in groupItems" :key="group.id" class="card__wrapper">
        <Card
          :id="group.id"
          :title="group.title"
          :description="group.description"
          :selected="isSelected(group.id)"
          @toggle-joined-group="toggleGroup"
        />
      </div>
    </section>

    <Button @click="showModal = true" text="créer un nouveau groupe" />
    <Modal v-show="showModal" @close-modal="showModal = false" />
  </main>
</template>

<script>
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";
import Button from "../components/Button.vue";
import groupService from "../services/groups";
import userService from "../services/users";

export default {
  components: { Modal, Card, Button },
  data() {
    return {
      showModal: false,
      groupItems: [],
      joinedGroups: [],
      userId: "",
    };
  },
  methods: {
    async getAllGroups() {
      try {
        const response = await groupService.getGroups();
        this.groupItems = response;
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },
    async toggleGroup(groupId) {
      try {
        const isGroupJoined = this.joinedGroups.includes(groupId);
        if (isGroupJoined) {
          await userService.removeSavedGroup(this.userId, groupId);
          this.getUser(this.userId).then((userData) => {
            this.joinedGroups = userData.groups;
            console.log(this.joinedGroups);
          });
        } else {
          await userService.addSavedGroup(this.userId, groupId);
          this.getUser(this.userId).then((userData) => {
            this.joinedGroups = userData.groups;
            console.log(this.joinedGroups);
          });
        }
      } catch (error) {
        console.error("Error toggling the save status: ", error);
      }
    },
    async getUser(userId) {
      try {
        const response = await userService.getUser(userId);
        return response.data;
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },
    isSelected(groupId) {
      return this.joinedGroups.includes(groupId);
    },
  },
  created() {
    this.getAllGroups();
    this.userId = window.localStorage.getItem("id");
    // get all the saved posts
    this.getUser(this.userId).then((userData) => {
      this.joinedGroups = userData.groups;
    });
  },
};
</script>

<style scoped>
main {
  min-width: 90vw;
}

.card__wrapper{
max-width: 90%;
}
.groups__container {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@media  (min-width: 768px) {
  .groups__container {
    flex-direction: row;
  }
}
</style>
