<template>
  <tr v-if="!edit_mode">
    <td>
      {{ disease_name}}
    </td>
    <td>{{ year_start }}</td>
    <td>{{ type_disease }}</td>
    <td>{{ note }}</td>
    <td>{{ id }}</td>
    <td>
      <button type="button" class="update_button_design" @click="onEdit"></button>
    </td>
    <td>
      <button type="button" class="delete_button_design" @click="onDelete"></button>
    </td>
  </tr>

  <patients-disease-edit
    v-else
    :disease="this.disease"
    :year_start="this.year_start"
    :type_disease="this.type_disease"
    @edit_diseases_component="edit_diseases_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import PatientsDiseaseEdit from "./PatientsDiseaseEdit.vue";
export default {
  components: { PatientsDiseaseEdit },
  props: {
    id: {
      type: Number,
    },
    disease: {
      type: Number,
    },
    disease_name:{
      type: String,
    },
    year_start: {
      type: Number,
    },
    type_disease: {
      type: String,
    },
    note: {
      type: String,
    },
  },
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
        //будет всплывающее окно
        this.$emit("delete_diseases", this.id);
      }
    },
    edit_diseases_component(disease, year_start, type_disease, note) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте:",
        {
          disease,
          year_start,
          type_disease,
          note,
        }
      );
      this.$emit(
        "edit_diseases",
        this.id,
        disease,
        year_start,
        type_disease,
        note
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>

<style scoped>
.update_button_design,
.delete_button_design {
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  opacity: 0.5;
  transition: 0.3s;
  margin-left: 10px;
  cursor: pointer;
}
.update_button_design:hover {
  opacity: 1;
}
.delete_button_design:hover {
  opacity: 1;
}
</style>
