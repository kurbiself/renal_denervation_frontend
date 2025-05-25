<template>
  <form class="form-classic" @submit.prevent="applyFilters">
    <div>
      <h1>Список пациентов</h1>

      <div class="filter-container">
        <input
          type="text"
          v-model="filters.code"
          placeholder="Фильтр по коду"
          class="filter-input"
        />
        <select v-model="filters.gender" class="filter-select">
          <option value="">Все</option>
          <option value="Муж">Мужской</option>
          <option value="Жен">Женский</option>
        </select>
        <input type="date" v-model="filters.birth" class="filter-date" />
        <button type="submit" class="filter-apply">Применить</button>
        <button type="button" @click="resetFilters" class="filter-reset">
          Сбросить
        </button>
      </div>

      <div class="div-for-table-design">
        <button @click="addPatient" class="add">+</button>
        <table class="table_design">
          <thead>
            <tr>
              <th>код</th>
              <th>пол</th>
              <th>дата рождения</th>
            </tr>
          </thead>
          <tbody>
            <patients-component
              v-for="item in items"
              :id="item.id"
              :code="item.code"
              :birth="item.birth"
              :gender="item.gender"
            />
          </tbody>
        </table>
      </div>
      <button @click="exportToCSV" class="export-btn">
        Экспорт в CSV
      </button>
    </div>
  </form>
</template>

<script>
import PatientsComponent from "./PatientsComponent.vue";
export default {
  components: {
    PatientsComponent,
  },
  data() {
    return {
      items: [],
      filters: {
        code: "",
        gender: "",
        birth: "",
      },
      loading: false,
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const params = {};
        if (this.filters.code) params.code = this.filters.code;
        if (this.filters.gender) params.gender = this.filters.gender;
        if (this.filters.birth) params.birth = this.filters.birth;

        const response = await this.$http.get("patient/", { params });
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addPatient() {
      this.$router.push({
        name: "newpatient",
      });
    },

    applyFilters() {
      this.getData();
    },

    resetFilters() {
      this.filters = {
        code: "",
        gender: "",
        birth: "",
      };
      this.getData();
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU");
    },

    async exportToCSV() {
      this.loading = true;
      try {
        // Собираем те же параметры фильтрации
        const params = {
          ...(this.filters.code && { code: this.filters.code }),
          ...(this.filters.gender && { gender: this.filters.gender }),
          ...(this.filters.birth && { birth: this.filters.birth }),
        };

        const response = await this.$http.get("patient/export_csv/", {
          params,
          responseType: "blob", // Важно для скачивания файла
        });

        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "patients.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Ошибка при экспорте:", error);
        alert("Произошла ошибка при выгрузке данных");
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-input,
.filter-select,
.filter-date {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-apply {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-reset {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.filter-apply:hover {
  background-color: #45a049;
}

.filter-reset:hover {
  background-color: #e0e0e0;
}

.loading-message {
  margin: 20px;
  color: #666;
}
.export-btn {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px
}

.export-btn:hover {
  background-color: #45a049;
}

.export-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
