<template>
  <tr v-if="!edit_mode">
    <td>{{ fullname }}</td>
    <td>{{ shortname }}</td>
    <td>{{ code_ICD_10 }}</td>
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
  <edit-disease
    v-else
    :fullname="this.fullname"
    :shortname="this.shortname"
    :code_ICD_10="this.code_ICD_10"
    :note="this.note"
    @edit_diseases_component="edit_diseases_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import EditDisease from "./EditDisease.vue";
export default {
  components: { EditDisease },
  props: {
    id: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    shortname: {
      type: String,
    },
    code_ICD_10: {
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
    edit_diseases_component(fullname, shortname, code_ICD_10, note) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте:",
        {
          fullname,
          shortname,
          code_ICD_10,
          note,
        }
      );
      this.$emit(
        "edit_diseases",
        this.id,
        fullname,
        shortname,
        code_ICD_10,
        note,
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>

<style>
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
