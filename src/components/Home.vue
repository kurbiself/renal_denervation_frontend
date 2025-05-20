<script>
import UserComponent from "./UserComponent.vue";
export default {
  components: {
    UserComponent,
  },
};
</script>

<template>
  <div class="container-nav">
    <header>
      <div class="logo-nav">
        <h1 class="title">
          <img class="logo" src="@/assets/logo.png" width="180" height="150" />
        </h1>
      </div>
      <div class="navigation">
        <nav class="main_nav">
          <user-component class="exit_nav" />
          <ul>
            <li><router-link to="/">О проекте</router-link></li>
            <li><router-link to="/patientslist">Пациенты</router-link></li>
            <li><router-link to="/researchlist">Исследования</router-link></li>
            <li>
              <div class="dropdown">
                <a>Справочник</a>
                <div class="dropdown-content">
                  <router-link to="/diseaseslist">Заболевания</router-link>
                  <router-link to="/researchtemplates"
                    >Шаблоны исследований</router-link
                  >
                  <router-link to="/drugslist"
                    >Лекарственные препараты</router-link
                  >
                  <router-link to="/unitslist">Единицы измерений</router-link>
                </div>
              </div>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<style>
.container-nav {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

/* Контейнер <div> - нужен для позиционирования выпадающего контента */
.dropdown {
  position: absolute;
  display: inline-block;
}

.logo-nav {
  flex: 1;
  flex-grow: 1;
}
.navigation {
  flex: 2;
  flex-grow: 2;
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
  box-shadow: 0 0px 10px #171b4890;
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

nav {
  /*background-color: rgb(64, 178, 198);*/
  text-align: center;
  font-size: 20px;
  padding: 18px;
  position: absolute; /* Абсолютное позиционирование */
  top: 20px; /* Положение от верхнего края */
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
  margin-left: 150px;
  border-radius: 20px;
}

.exit_nav .door {
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
.exit_nav .door:hover {
  transform: translateX(+5px);
}

nav a.router-link-exact-active {
  color: #ff4444;
}
</style>
