<template>
    <div>
      <p>Регистр ренальной денервации.</p>
      <div>
        <router-link v-if="!isLoggedIn" :to="{ name: 'login' }">
          Пожалуйста, авторизуйтесь
        </router-link>
        <span v-else>Привет, {{ userName }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isAuthenticated;
      },
      userName: function () {
        return this.$store.getters.userName;
      },
    },
  };
  </script>
  <style scoped>
  div {
    text-align: center;
    font-size: larger;
  }
  p {
    margin-top: 20pt;
  }
  </style>
  