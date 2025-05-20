<template>
  <form class="form-classic" @submit.prevent>
    <h1>Исследование {{ this.$route.query.research_name }}</h1>
    <div>
      <button @click="add_research_values" class="add-without-div">+</button>
      <table class="strict-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Показатель</th>
            <th>Сокращение</th>
            <th>Значение</th>
            <th>Референсное значение</th>
            <th>Единица измерения</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          <about-research-component
            v-for="item in items"
            :id="item.id"
            :metric_values="item"
            @edit_metric_values="edit_metric_values"
            @delete_metric_value="delete_metric_value"
          />
        </tbody>
      </table>
      <div class="footer-buttons">
        <button @click="goBack">Вернуться к списку</button>
        <button
          type="button"
          class="delete_item"
          @click.self="showModal = true"
        >
          Удалить
        </button>
      </div>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить исследование?</p>
          <div class="modal-actions">
            <button
              @click="delete_research"
              :disabled="loading"
              class="delete-btn"
            >
              {{ loading ? "Удаление..." : "Да, удалить" }}
            </button>
            <button @click="closeModal" :disabled="loading" class="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import AboutResearchComponent from "./AboutResearchComponent.vue";

export default {
  components: { AboutResearchComponent },
  props: {
    research_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: {},
      showModal: false,
      loading: false,
      metricValuesData: {
        research_id: Number(this.research_id),
        metric_id: null,
        value_numerical: null,
        value_qualitative_id: [],
        value_binary: null,
        value_descriptive: null,
        note: null,
      },
    };
  },
  methods: {
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
      }
    },
    async getData() {
      try {
        const response = await this.$http.get(
          `metrics-values/?research_id=${this.research_id}`
        );
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteResearch() {
      console.log("Данные перед отправкой DEL:", this.research_id);
      try {
        this.loading = true;
        this.preventUpdates = true;
        await this.$http.delete("researchs/" + this.research_id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.showModal = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.preventUpdates = false;
      }
    },
    async editMetricValues(id) {
      console.log("Данные перед отправкой PUT:", this.metricValuesData);

      try {
        await this.$http.put(
          "metrics-values/" + id + "/",
          this.metricValuesData,
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMetricValue(id) {
      console.log("Данные перед отправкой DELETE:", id);
      try {
        await this.$http.delete("metrics-values/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    edit_metric_values({
      id,
      metric_id,
      value_numerical,
      value_qualitative_id,
      value_binary,
      value_descriptive,
      note,
    }) {
      console.log("массив", value_qualitative_id);
      this.metricValuesData = {
        ...this.metricValuesData,
        metric_id,
        value_numerical,
        value_qualitative_id,
        value_binary,
        value_descriptive,
        note,
      };

      this.editMetricValues(id);
      this.getData();
      this.refresh();
    },
    delete_metric_value(id) {
      this.deleteMetricValue(id);
      this.getData();
      this.refresh();
    },
    add_research_values() {
      this.$router.push({
        name: "addresearchvalues",
        params: { research_id: this.research_id },
        query: {
          id_point: this.$route.query.id_point,
          research_name: this.$route.query.research_name,
        },
      });
    },
    goBack() {
      this.$router.push(`/pointdetails/${this.$route.query.id_point}`);
      this.refresh();
    },
    delete_research() {
      this.deleteResearch();
      this.goBack();
    },
    refresh() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
  },
  created() {
    this.getData();
  },
};
</script>
