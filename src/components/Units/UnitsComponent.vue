<template>
  <tr v-if="!edit_mode">
    <td>{{ fullname }}</td>
    <td>{{ shortname }}</td>
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
  <units-edit
    v-else
    :fullname="this.fullname"
    :shortname="this.shortname"
    @edit_units_component="edit_units_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import UnitsEdit from "./UnitsEdit.vue";
export default {
  props: {
    id: { type: Number },
    fullname: { type: String },
    shortname: { type: String },
  },
  components: { UnitsEdit },
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
        this.$emit("delete_units", this.id);
      }
    },
    edit_units_component(fullname, shortname) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте:",
        {
          fullname,
          shortname,
        }
      );
      this.$emit(
        "edit_units",
        this.id,
        fullname,
        shortname
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
