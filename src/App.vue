<script>
import UserComponent from "./components/UserComponent.vue";
export default {
  components: {
    UserComponent,
  },
};
</script>

<template>
  <header>
    <h1 class="title">
      <img class="logo" src="@/assets/heart.png" width="150" height="100" /> 
    </h1>
    <div class="navigation">
      <nav class="main_nav">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/patientslist">Пациенты</router-link></li>
          <li><router-link to="/researchlist">Исследования</router-link></li>
          <li>
            <div class="dropdown">
              <a>Справочник</a>
              <div class="dropdown-content">
                <router-link to="/diseaseslist">Заболевания</router-link>
                <router-link to="/researchtemplates">Шаблоны исследований</router-link>
                <router-link to="/drugslist">Лекарственные препараты</router-link>
                <router-link to="/unitslist">Единицы измерений</router-link>
              </div>
            </div>
          </li>
          <li><user-component class="exit_nav" /></li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style scoped>
/* Контейнер <div> - нужен для позиционирования выпадающего контента */
.dropdown {
  position: absolute;
  display: inline-block;
}

/* Выпадающий контент (по умолчанию скрыт) */
.dropdown-content {
  display: none;
  position: absolute;
  top: 45px;
  background-color: #0097b3;
  min-width: 150px;
  z-index: 1;
 
  border-radius: 20px;
  box-shadow: 0 0px 10px #171b4890;;
}

/* Ссылки внутри выпадающего блока */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Показываем выпадающий блок при наведении */
.dropdown:hover .dropdown-content {
  display: block;
}

header {
  display: flex;
  color: rgb(139, 215, 234);
  min-width: 1024px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.navigation {
  display: block;
}
nav {
  width: 100%;
  /*background-color: rgb(64, 178, 198);*/
  text-align: center;
  font-size: 20px;
  padding: 18px;
  position: absolute; /* Абсолютное позиционирование */
  top: 20px; /* Положение от верхнего края */
  right: 10px;
  width: 900px; /* Ширина блока */
}
.main_nav ul {
  display: flex;
  list-style-type: none;
}
.main_nav li {
  display: list-item;
}
.exit_nav {
  font-size: 20px;
  padding: 18px;
  margin-left: 150px;
  border: 2px solid #205a91;
  border-radius: 20px;
}
.exit_nav:hover {
  border: 0px;
}
.exit_nav:focus {
  border: 0px;
}

nav a.router-link-exact-active {
  color: #ff4444
}
</style>
