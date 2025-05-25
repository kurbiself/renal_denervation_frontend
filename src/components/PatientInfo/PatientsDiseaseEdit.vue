<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table class="table-edit">
        <tbody>
          <tr>
            <th>Заболевание</th>
            <th>
              <select v-model="disease_new">
                <variants-disease name="diseases" :selected="disease_new" />
              </select>
            </th>
          </tr>
          <tr>
            <th>Начало заболевания</th>
            <th>
              <input v-model.number="year_start_new" type="number" />
            </th>
          </tr>
          <tr>
            <th>Значимость</th>
            <th>
              <select v-model="type_disease_new">
                <option type_disease_new="Основное">Основное</option>
                <option type_disease_new="Сопутствующее">Сопутствующее</option>
              </select>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea form="EditForm" v-model.lazy.trim="note_new" />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
    <button class="agree_button" type="button" title="Сохранить" @click="onSave">
      ✔️
    </button>
    <button class="cancel_button" type="button" title="Отменить" @click="onCancel">
      ❌
    </button>
  </div>
</template>

<script>
import VariantsDisease from "./VariantsDisease.vue";
export default {
  components: { VariantsDisease },
  props: {
    disease: {
      type: Object,
      required: true,
    },
    year_start: {
      type: Number,
      required: true,
    },
    type_disease: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      disease_new: this.disease,
      year_start_new: this.year_start,
      type_disease_new: this.type_disease,
      note_new: this.note,
    };
  },
  methods: {
    onSave() {
      this.$emit(
        "edit_diseases_component",
        this.disease_new,
        this.year_start_new,
        this.type_disease_new,
        this.note_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
