<template>
  <div>
    <div v-if="isLoggedIn">
      <home></home>
      <router-view></router-view>
    </div>
    <login-form v-else></login-form>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import LoginForm from "./components/LoginForm.vue";
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
    userName: function () {
      return this.$store.getters.userName;
    },
  },
  components: { Home, LoginForm },
};
</script>
<style>
header {
  display: flex;
  color: rgb(139, 215, 234);
  min-width: 1024px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
