<template>
  <h1>Mes actualités</h1>

  <form @submit.prevent="newPost">
    <h2>Quoi de neuf?</h2>
    <div>
      <label for="title">titre</label>
      <input id="title" v-model="title" required />
    </div>
    <div>
      <label for="content">message</label>
      <input id="content" v-model="content" required />
    </div>

    <button type="submit">publier</button>
  </form>

  <section class="feed__container">
    <div v-for="item in feedItems" :key="item.id" class="feed__item">
      <div>
        <!-- <span>{{ item.user.username }}</span> -->
        {{ formattedDate(item.createdAt) }}
      </div>
      <p>{{ item.title }}</p>
      <p>{{ item.content }}</p>
      <button>Rejoindre</button>
    </div>
  </section>
</template>

<script>
import { format } from 'date-fns';
import postService from "../services/posts";

const token = window.localStorage.getItem("jwttoken");
postService.setToken(token);

export default {
  data() {
    return {
      title: "",
      content: "",
      feedItems: [],
      errorMessage: "",
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
        }
      } catch (error) {
        this.errorMessage = error.response.data.error || "An error occurred";
      }
    },
    async getAllPosts() {
      try {
        const response = await postService.getAll();
        console.log(response)
        this.feedItems = response;
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while fetching posts.";
      }
    },
  },
  created() {
    // Fetch all posts when the component is created
    this.getAllPosts();
  },
  computed: {
    formattedDate() {
      return (createdAt) => {
      const date = new Date(createdAt);
      return `le ${format(date, 'dd/MM/yyyy')} à ${format(date, 'HH:mm')}`;
    }}
  }
};
</script>

<style>
h1 {
  margin-bottom: 2rem;
}

.feed__container {
  display: flex;
  flex-direction: column-reverse;
  gap: 4rem;
}
.feed__item {
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
}

button {
  border-radius: 15px;
  margin: 1rem;
}

form {
  padding: 3rem;
}
</style>
