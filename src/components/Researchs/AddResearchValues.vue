<template>
  <h1>Добавление значений</h1>
  <div v-if="!next_add">
    <change-metric-id
      v-if="research_template_id"
      :research_template_id="research_template_id"
      @add_item="add_item"
      @cancel_item="cancel_item"
    />
  </div>
  <div v-else>
    <add-metric-values
      :metric="metric"
      @add_item_values="add_item_values"
      @cancel_item="cancel_item"
    />
  </div>
</template>

<script>
import ChangeMetricId from "./ChangeMetricId.vue";
import AddMetricValues from "./AddMetricValues.vue";
export default {
  data() {
    return {
      next_add: false,
      research_template_id: null,
      metric: {},
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
  components: { ChangeMetricId, AddMetricValues },
  props: {
    research_id: {
      type: String,
      required: true,
    },
  },
  methods: {
    onNext() {
      this.next_add = true;
    },
    async getResearchTemplateId() {
      const response = await this.$http.get(`researchs/${this.research_id}/`);
      this.research_template_id = response.data.research_template_id;
    },
    async getMetric() {
      const response = await this.$http.get(
        `metrics/${this.metricValuesData.metric_id}/`
      );
      this.metric = response.data;
    },
    async addMetricId() {
      console.log(
        "Данные перед отправкой в metrics-templates!!!!!!!!:",
        this.metricData
      );
      try {
        await this.$http.post("metrics-values/", this.metricValuesData, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    add_item({ metric_id }) {
      this.metricValuesData = {
        ...this.metricValuesData,
        metric_id,
      };
      console.log("Данные перед отправкой в add:", this.metricValuesData);
      this.onNext();
      this.getMetric();
    },
    add_item_values({
      value_numerical,
      value_qualitative_id,
      value_binary,
      value_descriptive,
      note,
    }) {
      console.log("Данные перед отправкой в add:", this.value_qualitative_id);
      this.metricValuesData = {
        ...this.metricValuesData,
        value_numerical,
        value_qualitative_id,
        value_binary,
        value_descriptive,
        note,
      };
      console.log("Данные перед отправкой в add:", this.metricValuesData);
      this.addMetricId();
      this.next_add = false;
      this.cancel_item();
    },
    cancel_item() {
      setTimeout(() => {
        this.$router.push({
          name: "aboutresearch",
          params: { research_id: this.research_id },
          query: {
            id_point: this.$route.query.id_point,
            research_name: this.$route.query.research_name,
          },
        });
      }, 500);
    },
  },
  created() {
    this.getResearchTemplateId();
  },
};
</script>
