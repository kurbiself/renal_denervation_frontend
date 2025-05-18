<template>
  <tr v-if="!edit_mode">
    <td>
      {{ id }}
    </td>
    <td>
      {{ metric_data.fullname }}
    </td>
    <td>
      {{ metric_data.shortname }}
    </td>
    <td v-if="metric_data.measurement_type === 'количественный'">
      {{ metric_data.reference_min_numerical }} -
      {{ metric_data.reference_max_numerical }}
    </td>
    <td v-if="metric_data.measurement_type === 'качественный'">
      {{ primaryQualitativeValue }}
    </td>
    <td v-else-if="metric_data.measurement_type === 'бинарный'">
      {{ metric_data.reference_binary === false ? "Патология" : "Норма" }}
    </td>
    <td v-else-if="metric_data.measurement_type === 'описательный'">
      -
    </td>
    <td>
      {{
        metric_data.unit_for_metric_shortname !== "None"
          ? metric_data.unit_for_metric_shortname
          : "-"
      }}
    </td>
    <td>{{metric_data.note}}</td>
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
  <metrcis-edit
    v-else
    :fullname="this.metric_data.fullname"
    :shortname="this.metric_data.shortname"
    :measurement_type="this.metric_data.measurement_type"
    :reference_max_numerical="this.metric_data.reference_max_numerical"
    :reference_min_numerical="this.metric_data.reference_min_numerical"
    :reference_binary="this.metric_data.reference_binary"
    :unit_for_metric="this.metric_data.unit_for_metric"
    :note="this.metric_data.note"
    @edit_metric_component="edit_metric_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import Metrics from "../Metrics/NewMetrics.vue";
import MetrcisEdit from "./MetrcisEdit.vue";
export default {
  components: { Metrics, MetrcisEdit },
  props: {
    id: {
      type: Number,
      required: true,
    },
    metric_id: {
      type: Number,
    },
    metric_data: {
      type: Object,
    },
    // note: {
    //   type: String,
    // }, скорее всего удалить
  },
  data() {
    return {
      variants_qualitative: [],
      edit_mode: false,
    };
  },
  computed: {
    primaryQualitativeValue() {
      return this.variants_qualitative[0]?.value ?? "Нет данных";
    },
  },
  methods: {
    async getVariants() {
      if (this.metric_data.measurement_type !== "качественный") return;
      try {
        const response = await this.$http.get(
          `variants-qualitative/?metric_id=${this.id}&reference=True`
        );
        this.variants_qualitative = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onEdit() {
      this.edit_mode = true;
    },
    onDelete() {
      if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        //будет всплывающее окно
        this.$emit("delete_metric", this.metric_id);
      }
    },
    edit_metric_component(
      fullname_new,
      shortname_new,
      reference_max_numerical_new,
      reference_min_numerical_new,
      reference_binary_new,
      unit_for_metric_new,
      note_new
    ) {
      this.$emit("edit_metrics", {
        id: this.metric_id,
        fullname: fullname_new,
        shortname: shortname_new,
        measurement_type: this.metric_data.measurement_type,
        reference_max_numerical: reference_max_numerical_new,
        reference_min_numerical: reference_min_numerical_new,
        reference_binary: reference_binary_new,
        unit_for_metric: unit_for_metric_new,
        note: note_new,
      });
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
  created() {
    this.getVariants();
  },
};
</script>
