<template>
  <div>
    <form class="form-container" id="AddForm">
      <table>
        <tbody>
          <tr>
            <th>Выберите показатель</th>
            <th>
              <select
                v-model="metric_id_new"
                class="form-select"
                v-if="!isLoading && metrics.length > 0"
              >
                <option value="" disabled>Выберите показатель...</option>
                <option
                  v-for="metric in metrics"
                  :key="metric.metric_id"
                  :value="metric.metric_id"
                >
                  {{ metric.metric_data.fullname }}
                </option>
              </select>
              <div v-else class="loading-message">
                {{ isLoading ? 'Загрузка показателей...' : 'Нет доступных показателей' }}
              </div>
              <div v-if="error" class="error-message">{{ error }}</div>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="form-actions">
        <button
          class="agree_button"
          type="button"
          form="AddForm"
          title="Сохранить"
          @click="onSave"
        >
          ✔️
        </button>
        <button
          class="cancel_button"
          type="button"
          form="AddForm"
          title="Отменить"
          @click="onCancel"
        >
          ❌
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import VariantsMetricId from "./VariantsMetricId.vue";
export default {
  props: { research_template_id: { type: String, required: true } },
  components: { VariantsMetricId },
  data() {
    return {
      metric_id_new: null,
      metrics: [],
      isLoading: false,
      error: null
    };
  },
  async created() {
    this.loadMetrics();
  },
  methods: {
    async loadMetrics() {
      this.isLoading = true;
      try {
        const response = await this.$http.get(
          `metrics-templates/?research_template_id=${this.research_template_id}`
        );
        this.metrics = response.data;
      } catch (error) {
        console.error("Ошибка загрузки показателей:", error);
      } finally {
        this.isLoading = false;
      }
    },
    onSave() {
      if (!this.metric_id_new) {
        alert("Пожалуйста, выберите показатель");
        return;
      }
      console.log("Данные перед отправкой:", {
        metric_id_new: this.metric_id_new,
      });
      this.$emit("add_item", {
        metric_id: this.metric_id_new,
      });
      //this.$emit("cancel_item");
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
