<template>
  <main>
    <h1>Toutes les actualités</h1>

    <form class="feed__form" @submit.prevent="newPost">
      <h2>Quoi de neuf?</h2>
      <div>
        <label for="title">titre</label>
        <input id="title" v-model="title" required />
      </div>
      <div>
        <label for="content">message</label>
        <input id="content" v-model="content" required />
      </div>
      <Button text="publier" />
      <!-- <button type="submit">publier</button> -->
    </form>

    <section class="feed__container">
      <div v-for="item in feedItems" :key="item.id" class="feed__item">
        <StackedCard  
        :id="item.id"
        :username="item.user?.username"
        :date="formattedDate(item.createdAt)"
        :authored="item.user?.id === this.userId"
        :title="item.title"
        :content="item.content"
        :selected="isSelected(item.id)"
        @toggle-save-post="toggleSavePost"
        />
    </div>
    </section>
    
  </main>
</template>

<script>
import { format } from "date-fns";
import postService from "../services/posts";
import userService from "../services/users";
import StackedCard from "../components/StackedCard.vue";
import Button from "../components/Button.vue";

const token = window.localStorage.getItem("jwttoken");
postService.setToken(token);

export default {
  components: { Button, StackedCard },
  data() {
    return {
      title: "",
      content: "",
      feedItems: [],
      errorMessage: "",
      savedPosts: [],
      userId: "",
      user: {},
    };
  },
  methods: {
    async newPost() {
      try {
        if (this.title && this.content) {
          this.errorMessage = "";
          const post = await postService.post({
            title: this.title,
            content: this.content,
          });
          this.getAllPosts();
        }
      } catch (error) {
        this.errorMessage = error.response.data.error || "An error occurred";
      }
    },
    async getAllPosts() {
      try {
        const response = await postService.getAll();
        this.feedItems = response;
        console.log(response[0].user.id);
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
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
    async deletePost(id) {
      try {
        const response = await postService.deletePost(id);
        this.getAllPosts();
        return response;
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while deleting posts.";
      }
    },
    async toggleSavePost(postId) {
      try {
        const isPostSaved = this.savedPosts.includes(postId);
        if (isPostSaved) {
          await userService.removeSavedPost(this.userId, postId);
          this.getUser(this.userId).then((userData) => {
            console.log(userData.savedPosts);
            this.savedPosts = userData.savedPosts;
          });
        } else {
          await userService.addSavedPost(this.userId, postId);
          this.getUser(this.userId).then((userData) => {
            console.log(userData.savedPosts);
            this.savedPosts = userData.savedPosts;
          });
        }
      } catch (error) {
        console.error("Error toggling the save status: ", error);
      }
    },
    isSelected(postId) {
      return this.savedPosts.includes(postId);
    },
  },
  created() {
    // Fetch all posts when the component is created
    this.getAllPosts();
    // find id
    this.userId = window.localStorage.getItem("id");
    // get all the saved posts
    this.getUser(this.userId).then((userData) => {
      this.savedPosts = userData.savedPosts;
    });
  },
  computed: {
    formattedDate() {
      return (createdAt) => {
        const date = new Date(createdAt);
        return `le ${format(date, "dd/MM/yyyy")} à ${format(date, "HH:mm")}`;
      };
    },
  },
};
</script>

<style>
main {
  min-width: 90vw;
}
h1 {
  margin-bottom: 2rem;
}

.feed__container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 4rem;
}
.feed__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
  width: 100%;
}

.item__btn {
  width: 8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(196, 195, 195);
}

.--selected {
  background: #005959;
}

.feed__form {
  padding: 3rem;
}

.item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.delete__icon {
  fill: #005959;
  cursor: pointer;
}

.delete__icon:hover {
  fill: rgb(244, 126, 37);
  cursor: pointer;
}
</style>
