<template>
    <div>
  <div class="hamburger">
    <v-icon @click="toggleMenu" name="co-hamburger-menu" scale="2" />
</div>

    <ul v-if="isOpen" class="menu-items">
      <li v-if="!authenticated">
        <router-link to="/login">Se connecter</router-link>
      </li>
      <li v-if="!authenticated">
        <router-link to="/signup">Rejoins-nous</router-link>
      </li>
      <li v-if="authenticated">
        <router-link to="/profile">Profil</router-link>
      </li>
      <li v-if="authenticated"><router-link to="/feed">Actus</router-link></li>
      <li v-if="authenticated">
        <router-link to="/groups">Groupes</router-link>
      </li>
      <li v-if="authenticated">
        <Button @click="logout" text="Se déconnecter"/>
      </li>
    </ul>
</div>
</template>

<script>
import Button from './Button.vue';
export default {
  components:{
    Button
  },
  data() {
    return {
      isOpen: false,
      authenticated: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      window.localStorage.removeItem("jwttoken");
      this.$router.push("/");
      this.authenticated = false;
    },
  },
  created() {
    const token = window.localStorage.getItem("jwttoken");
    if (token) {
      this.authenticated = true;
    }
  },
};


</script>

<style scoped>



ul {
  border-radius: 20px;
    position: absolute;
    top: 96px;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    list-style: none;
    background: #f8f5ed;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding-left: 1rem;
  z-index: 99;
  }



li{
    padding: 1rem .5rem;
}

a{
    color: #0a0c0d;
}
</style>
