<script>
import UserComponent from "./UserComponent.vue";
export default {
  components: {
    UserComponent,
  },
};
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-container">
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
      </div>
      
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">О проекте</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/patientslist" class="nav-link">Пациенты</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/researchlist" class="nav-link">Исследования</router-link>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle">Фармакология</a>
            <div class="dropdown-menu">
              <router-link to="/drugslist" class="dropdown-item">Лекарственные препараты</router-link>
              <router-link to="/activeingredients" class="dropdown-item">Активные вещества</router-link>
              <router-link to="/pharmacologicalgroups" class="dropdown-item">Фармакологическая группа</router-link>
            </div>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle">Справочник</a>
            <div class="dropdown-menu">
              <router-link to="/diseaseslist" class="dropdown-item">Заболевания</router-link>
              <router-link to="/researchtemplates" class="dropdown-item">Шаблоны исследований</router-link>
              <router-link to="/unitslist" class="dropdown-item">Единицы измерений</router-link>
            </div>
          </li>
        </ul>
      </nav>
      
      <div class="user-section">
        <user-component />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  height: 80px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.main-nav {
  flex: 1 1 auto;
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: inline-block;
}

.nav-link:hover {
  color: #0097b3;
  background-color: #f5f5f5;
}

.nav-link.router-link-exact-active {
  color: #ffffff;
  background-color: #0097b3;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  padding: 10px 0;
}

.dropdown:hover .dropdown-menu {
  display: block;
  animation: fadeIn 0.3s ease;
}

.dropdown-item {
  color: #333;
  padding: 8px 20px;
  text-decoration: none;
  display: block;
  transition: all 0.2s;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f0f8ff;
  color: #0097b3;
}

.dropdown-item.router-link-exact-active {
  color: #ffffff;
  background-color: #0097b3;
}

.user-section {
  flex: 0 0 auto;
  margin-left: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 15px;
  }
  
  .nav-list {
    flex-wrap: wrap;
    gap: 10px;
    margin: 15px 0;
  }
  
  .logo-container {
    margin-bottom: 10px;
  }
  
  .user-section {
    margin: 15px 0 0;
  }
}
</style>