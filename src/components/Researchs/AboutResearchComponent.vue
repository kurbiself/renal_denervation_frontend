<template>
  <tr v-if="!edit_mode">
    <td>{{ id }}</td>
    <td>{{ metric_values.metric_id_data.fullname }}</td>
    <td>{{ metric_values.metric_id_data.shortname }}</td>
    <td
      v-if="metric_values.metric_id_data.measurement_type === 'количественный'"
    >
      {{ metric_values.value_numerical }}
    </td>
    <td
      v-else-if="
        metric_values.metric_id_data.measurement_type === 'качественный'
      "
    >
      <div v-for="variant in variants_qualitative" :key="variant.id">
        {{ variant.value }}
      </div>
    </td>
    <td
      v-else-if="metric_values.metric_id_data.measurement_type === 'бинарный'"
    >
      {{ metric_values.value_binary === false ? "Нет" : "Да" }}
    </td>
    <td
      v-else-if="
        metric_values.metric_id_data.measurement_type === 'описательный'
      "
    >
      {{ metric_values.value_descriptive }}
    </td>

    <td
      v-if="metric_values.metric_id_data.measurement_type === 'количественный'"
    >
      {{ this.metric_values.metric_id_data.reference_min_numerical }} -
      {{ this.metric_values.metric_id_data.reference_max_numerical }}
    </td>
    <td
      v-else-if="
        metric_values.metric_id_data.measurement_type === 'качественный'
      "
    >
      {{ reference_for_qualitative }}
    </td>
    <td
      v-else-if="metric_values.metric_id_data.measurement_type === 'бинарный'"
    >
      {{
        metric_values.metric_id_data.reference_binary === false ? "Нет" : "Да"
      }}
    </td>
    <td
      v-else-if="metric_values.metric_id_data.measurement_type === 'описательный'"
    >
      -
    </td>

    <td>
      {{
        this.metric_values.metric_id_data.unit_for_metric_shortname !== "None"
          ? this.metric_values.metric_id_data.unit_for_metric_shortname
          : "-"
      }}
    </td>
    <td>
      {{ metric_values.note }}
    </td>
    <td>
      <button
        type="button"
        class="update_button_design"
        @click="onEdit"
      ></button>
    </td>
    <td>
      <button
        type="button"
        class="delete_button_design"
        @click="onDelete"
      ></button>
    </td>
  </tr>
  <metric-value-edit
    v-else
    :value_numerical="this.metric_values.value_numerical"
    :value_qualitative_id="this.metric_values.value_qualitative_id"
    :value_binary="this.metric_values.value_binary"
    :value_descriptive="this.metric_values.value_descriptive"
    :note="this.metric_values.note"
    :measurement_type="this.metric_values.metric_id_data.measurement_type"
    @edit_metric_value_component="edit_metric_value_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import MetricValueEdit from "./MetricValueEdit.vue";
export default {
  props: {
    id: {
      type: Number,
    },
    metric_values: {
      type: Object,
    },
  },
  components: {
    MetricValueEdit,
  },
  data() {
    return {
      variants_qualitative: {},
      reference_for_qualitative: {},
      edit_mode: false,
    };
  },
  methods: {
    async getVariantsMetric() {
      if (
        this.metric_values.metric_id_data.measurement_type !== "качественный" ||
        !Array.isArray(this.metric_values.value_qualitative_id)
      ) {
        return;
      }

      this.variants_qualitative = [];
      try {
        for (const id of this.metric_values.value_qualitative_id) {
          try {
            const response = await this.$http.get(
              `variants-qualitative/${id}/`
            );
            this.variants_qualitative.push(response.data); //push - метод для добавления элемента
          } catch (error) {
            console.error(`Ошибка загрузки варианта ${id}:`, error);
          }
        }
        const reference = await this.$http.get(
          `variants-qualitative/?metric_id=${this.metric_values.metric_id}&reference=True`
        );
        this.reference_for_qualitative = reference.data[0].value;
      } catch (error) {
        console.error("Общая ошибка:", error);
      }
    },
    onEdit() {
      this.edit_mode = true;
    },
    onDelete() {
      if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        //будет всплывающее окно
        this.$emit("delete_metric_value", this.id);
      }
    },
    edit_metric_value_component(
      value_numerical_new,
      value_qualitative_id_new,
      value_binary_new,
      value_descriptive_new,
      note_new
    ) {
      console.log("Данные перед отправкой в главный:", {
        id: this.metric_values.id,
        metric_id: this.metric_values.metric_id,
        value_numerical_new: value_numerical_new,
        value_qualitative_id_new: value_qualitative_id_new,
        value_binary_new: value_binary_new,
        value_descriptive_new: value_descriptive_new,
        note_new: note_new,
      });
      this.$emit("edit_metric_values", {
        id: this.metric_values.id,
        metric_id: this.metric_values.metric_id,
        value_numerical: value_numerical_new,
        value_qualitative_id: value_qualitative_id_new,
        value_binary: value_binary_new,
        value_descriptive: value_descriptive_new,
        note: note_new,
      });
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
  created() {
    this.getVariantsMetric();
  },
};
</script>
