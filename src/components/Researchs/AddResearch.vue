<template>
  <h1>Добавление нового исследования для К.Т. {{ this.point_id }}</h1>
  <div v-if="!next_add">
    <add-research-component @add_item="add_item" @cancel_item="cancel_item" />
  </div>
</template>

<script>
import AddResearchComponent from "./AddResearchComponent.vue";

export default {
  components: { AddResearchComponent },
  data() {
    return {
      next_add: false,
      metrics_templates: [],
      research_id: null,
    };
  },
  props: {
    point_id: {
      type: String,
      required: true,
    },
  },
  methods: {
    onNext() {
      this.next_add = true;
    },
    async addData(research_template_id, check_point_id, date, note) {
      console.log("Данные перед отправкой в главном:", {
        research_template_id,
        check_point_id,
        date,
        note,
      });
      try {
        const response = await this.$http.post(
          "researchs/",
          {
            research_template_id: research_template_id,
            check_point_id: check_point_id,
            date: date,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
        this.research_id = response.data.id;
        console.log("research_id", this.research_id);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getData(research_template_id) {
      try {
        console.log("Variants:", research_template_id);
        const response = await this.$http.get(
          `metrics-templates/?research_template_id=${research_template_id}`
        );
        this.metrics_templates = response.data;
        console.log("metrics-templates:", this.metrics_templates);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async addMetricId(metric_id) {
      try {
        await this.$http.post(
          "metrics-values/",
          {
            research_id: this.research_id,
            metric_id: metric_id,
          },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    // add_item(research_template_id, date, note) {
    //   this.addData(research_template_id, this.point_id, date, note);
    //   this.getData(research_template_id);
    //   this.add_metrics_values_null();
    //   this.next_add = true;
    // },
    async add_metrics_values_null() {
      if (!this.metrics_templates || this.metrics_templates.length === 0) {
        console.warn("Нет метрик для добавления");
        return;
      }

      const results = await Promise.all(
        this.metrics_templates.map((template) =>
          this.addMetricId(template.metric_id)
        )
      );

      console.log("Результаты добавления метрик:", results);
    },
    async add_item(research_template_id, date, note) {
      try {
        // 1. Сначала добавляем исследование
        await this.addData(research_template_id, this.point_id, date, note);
        if (!this.research_id) {
          throw new Error(
            "Не удалось добавить исследование (research_id не установлен)"
          );
        }

        // 2. Затем загружаем метрики
        await this.getData(research_template_id);
        if (!this.metrics_templates || this.metrics_templates.length === 0) {
          throw new Error("Нет метрик для добавления");
        }

        // 3. Добавляем метрики
        await this.add_metrics_values_null();

        // 4. Переходим к следующему шагу
        this.next_add = true;
      } catch (error) {
        console.error("Ошибка в процессе добавления:", error);
        alert("Произошла ошибка при добавлении исследования");
      }
    },
    cancel_item() {
      setTimeout(() => {
        this.$router.push(`/pointdetails/${this.point_id}`);
      }, 500);
    },
  },
};
</script>
