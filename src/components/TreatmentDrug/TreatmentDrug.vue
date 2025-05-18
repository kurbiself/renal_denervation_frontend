<template>
  <tr v-if="!edit_mode">
    <td>{{ medicine_name }}</td>
    <td>{{ dose }}</td>
    <td v-if="taking_medicine_morning">✔</td>
    <td v-else>✘</td>
    <td v-if="taking_medicine_day">✔</td>
    <td v-else>✘</td>
    <td v-if="taking_medicine_evening">✔</td>
    <td v-else>✘</td>
    <td v-if="taking_medicine_night">✔</td>
    <td v-else>✘</td>
    <td>{{ note }}</td>
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
  <treatment-drug-edit
    v-else
    :medicine="this.medicine"
    :dose="this.dose"
    :taking_medicine_morning="this.taking_medicine_morning"
    :taking_medicine_day="this.taking_medicine_day"
    :taking_medicine_evening="this.taking_medicine_evening"
    :taking_medicine_night="this.taking_medicine_night"
    :note="this.note"
    @edit_treatment_drug="edit_treatment_drug"
    @cancel_item="cancel_item"
  />
</template>

<script>
import TreatmentDrugEdit from "./TreatmentDrugEdit.vue";
export default {
  props: {
    id: { type: Number },
    check_point_id: { type: Number },
    medicine: { type: Number },
    medicine_name: { type: String },
    dose: { type: Float64Array },
    taking_medicine_morning: { type: Boolean },
    taking_medicine_day: { type: Boolean },
    taking_medicine_evening: { type: Boolean },
    taking_medicine_night: { type: Boolean },
    note: { type: String },
  },
  components: { TreatmentDrugEdit },
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    onDelete() {
      if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        this.$emit("delete_treatment_drug", this.id);
      }
    },
    edit_treatment_drug(
      medicine_new,
      dose_new,
      taking_medicine_morning_new,
      taking_medicine_day_new,
      taking_medicine_evening_new,
      taking_medicine_night_new,
      note_new
    ) {
      console.log(
        "Данные изменения медикотерапии перед отправкой в компоненте:",
        {
          medicine_new,
          dose_new,
          taking_medicine_morning_new,
          taking_medicine_day_new,
          taking_medicine_evening_new,
          taking_medicine_night_new,
          note_new,
        }
      );
      this.$emit(
        "edit_treatment_drug_component",
        this.id,
        this.check_point_id,
        medicine_new,
        dose_new,
        taking_medicine_morning_new,
        taking_medicine_day_new,
        taking_medicine_evening_new,
        taking_medicine_night_new,
        note_new
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
