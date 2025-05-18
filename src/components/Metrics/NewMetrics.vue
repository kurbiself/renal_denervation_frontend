<template>
  <h1>Добавление нового показателя</h1>
  <div v-if="!next_add">
    <new-metrics-component @add_item="add_item" @cancel_item="cancel_item" />
  </div>
  <add-reference
    v-else
    @supplement_item="supplement_item"
    @cancel_item="cancel_item"
    :measurement_type="this.metricData.measurement_type"
  />
</template>

<script>
import NewMetricsComponent from "./NewMetricsComponent.vue";
import AddReference from "./AddReference.vue";
export default {
  components: { NewMetricsComponent, AddReference },
  data() {
    return {
      next_add: false,
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
      newMetrciId: null,
    };
  },
  props: {
    id: { type: String },
  },
  methods: {
    onNext() {
      this.next_add = true;
    },
    async addData() {
      console.log("Данные перед отправкой в NewM:", this.metricData);
      try {
        const response = await this.$http.post("metrics/", this.metricData, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.newMetrciId = response.data.id;
        this.addMetricTemplate(this.newMetrciId)
      } catch (error) {
        console.log(error);
      }
    },
    async addMetricTemplate(metrciId) {
      try {
        await this.$http.post(
          "metrics-templates/",
          { research_template_id: this.id, metric_id: metrciId },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    add_item({ fullname, shortname, measurement_type }) {
      console.log(
        "Данные перед отправкой в add:",
        fullname,
        shortname,
        measurement_type
      );
      this.metricData = {
        ...this.metricData,
        fullname,
        shortname,
        measurement_type,
      };
      console.log("Данные перед отправкой в add:", this.metricData);
      this.next_add = true;
    },
    supplement_item(referenceData) {
      this.metricData = {
        ...this.metricData,
        ...referenceData,
      };
      console.log("Данные перед отправкой в NewM:", this.metricData);
      this.addData();
      this.next_add = false;
      this.cancel_item();
    },
    cancel_item() {
      this.$router.push("/researchtemplates/" + this.id);
    },
  },
};
</script>
