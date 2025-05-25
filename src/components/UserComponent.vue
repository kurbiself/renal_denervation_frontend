<template>
  <div class="logout-container">
    <span>
      <span v-if="isLoggedIn" class="username"> {{ userName }} | </span>
      <span v-if="showLink">
        <button @click="showModal = true" class="door"></button>
      </span>
    </span>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h3>Подтвердите выход</h3>
        <p>Вы действительно хотите выйти из системы?</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showModal = false">Отмена</button>
          <button class="confirm-btn" @click="handleLogout">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapActions } from "vuex";

export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
    userName: function () {
      return this.$store.getters.userName;
    },
    showLink: function () {
      return !(this.$route.name == "login" || this.$route.name == "logout");
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch("removeToken");
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при выходе:", error);
      } finally {
        this.showModal = false;
      }
    },
  },
};
</script>

<style scoped>
.username {
  color: rgb(211, 149, 43);
  font-weight: bolder;
}
.logout-container {
  position: relative;
}
button {
  font-size: 20px;
  padding: 18px;
  border: 2px solid #205a91;
  border-radius: 20px;
}

.logout-icon {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  color: #ff4444;
}

.logout-icon:hover {
  background: rgba(255, 68, 68, 0.1);
  transform: scale(1.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.4rem;
}

.modal-content p {
  margin-bottom: 2rem;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.cancel-btn,
.confirm-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f0f0f0;
  color: #333;
  border: none;
}

.confirm-btn {
  background: #ff4444;
  color: white;
  border: none;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn:hover {
  background: #e53935;
}

.door {
  background-image: url("@/assets/exit.png");
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  transition: 0.3s;
  margin-left: 10px;
  cursor: pointer;
}
.door:hover {
  transform: translateX(+5px);
}
</style>
