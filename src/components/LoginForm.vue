<template>
  <h1 class="title">
    <img class="logo" src="@/assets/logo.png" width="280" height="250" />
  </h1>
  <div class="authorization_form">
    <form id="login_form">
      <label> Введите логин <br /> </label>
      <input
        type="text"
        size="50"
        form="login_form"
        v-model.lazy.trim="username"
      />
      <br />
      <label> Введите пароль <br /> </label>
      <input
        type="password"
        size="50"
        form="login_form"
        v-model.lazy.trim="password"
      />
      <br />
      <div class="auth_button">
        <button
          class="login_button"
          type="button"
          form="login_form"
          @click="onLogin"
        >
          Войти
        </button>
        <button
          class="login_button"
          type="button"
          form="login_form"
          @click="onCancel"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      await this.$store.dispatch("obtainToken", {
        username: this.username,
        password: this.password,
      });
      this.$router.push("/");
    },
    onCancel() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
