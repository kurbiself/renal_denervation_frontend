<template>
  <form @submit.prevent class="form-classic">
    <h1>Об иссследовании: {{ items_research_template.name }}</h1>
    <button @click="add_metrics_template" class="add-without-div">+</button>
    <table class="strict-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Показатели</th>
          <th>Сокращение</th>
          <th>Референсное значение</th>
          <th>Единица измерения</th>
          <th>Примечание</th>
          <th>Варианты качественного признака</th>
        </tr>
      </thead>
      <tbody>
        <research-details-component
          v-for="item in items_research_template.metrics_templates"
          :id="item.id"
          :metric_id="item.metric_id"
          :metric_data="item.metric_data"
          :note="item.note"
          @edit_metrics="edit_metrics"
          @delete_metric="delete_metric"
        />
      </tbody>
    </table>
    <div class="footer-buttons">
      <button @click="goBack">Вернуться к списку</button>
      <button type="button" class="delete_item" @click.self="showModal = true">
        Удалить шаблон
      </button>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>Подтверждение удаления</h3>
        <p>Вы уверены, что хотите удалить исследование?</p>
        <div class="modal-actions">
          <button
            @click="delete_research_template"
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
  </form>
</template>

<script>
import ResearchDetailsComponent from "./ResearchDetailsComponent.vue";
import NewMetrics from "../Metrics/NewMetrics.vue";
export default {
  components: { ResearchDetailsComponent, NewMetrics },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items_research_template: [],
      showModal: false,
      loading: false,
      preventUpdates: false,
      metricData: {
        fullname: null,
        shortname: null,
        measurement_type: null,
        reference_max_numerical: null,
        reference_min_numerical: null,
        reference_binary: null,
        unit_for_metric: null,
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
      if (this.preventUpdates) return;
      try {
        const response = await this.$http.get(
          "research-templates/" + this.id + "/"
        );
        this.items_research_template = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        this.loading = true;
        this.preventUpdates = true;
        await this.$http.delete("research-templates/" + this.id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.showModal = false;
      } catch (error) {
        console.error("Ошибка удаления:", error);
      } finally {
        this.loading = false;
        this.preventUpdates = false;
      }
    },
    async editMetric(id) {
      console.log("Данные перед отправкой PUT:", this.metricData);

      try {
        await this.$http.put("metrics/" + id + "/", this.metricData, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMetric(id) {
      console.log("Данные перед отправкой DELETE:", id);
      try {
        await this.$http.delete("metrics/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.push("/researchtemplates");
      this.refresh();
    },
    refresh() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
    delete_research_template() {
      this.deleteData();
      this.goBack();
      this.refresh();
    },
    add_metrics_template() {
      this.$router.push({
        name: "newmetrics",
        params: { id: this.id },
      });
    },
    edit_metrics({
      id,
      fullname,
      shortname,
      measurement_type,
      reference_max_numerical,
      reference_min_numerical,
      reference_binary,
      unit_for_metric,
      note,
    }) {
      this.metricData = {
        ...this.metricData,
        fullname,
        shortname,
        measurement_type,
        reference_max_numerical,
        reference_min_numerical,
        reference_binary,
        unit_for_metric,
        note,
      };

      this.editMetric(id);
      this.getData();
      this.refresh();
    },
    delete_metric(id) {
      this.deleteMetric(id);
      this.getData();
      this.refresh();
    },
  },
  created() {
    this.getData();
  },
};
</script>
