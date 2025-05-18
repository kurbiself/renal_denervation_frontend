<template>
  <tr v-if="!edit_mode">
    <td>{{ trade_name }}</td>
    <td>{{ international_name }}</td>
    <td>{{ active_ingredient_name }}</td>
    <td>{{ pharmacological_group_name }}</td>
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
  <edit-drugs
    v-else
    :trade_name="this.trade_name"
    :international_name="this.international_name"
    :active_ingredient="this.active_ingredient"
    @edit_drugs_component="edit_drugs_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import EditDrugs from "./EditDrugs.vue";
export default {
  components: { EditDrugs },
  props: {
    id: {
      type: Number,
      required: true,
    },
    trade_name: {
      type: String,
    },
    international_name: {
      type: String,
    },
    active_ingredient: {
      type: Number,
    },
    active_ingredient_name: {
      type: String,
    },
    pharmacological_group_id: {
      type: Number,
    },
    pharmacological_group_name: {
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
        this.$emit("delete_drugs", this.id);
      }
    },
    edit_drugs_component(
      trade_name_new,
      international_name_new,
      active_ingredient_new
    ) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте Drugs:",
        {
        trade_name_new,
        international_name_new,
        active_ingredient_new}
      );
      this.$emit(
        "edit_drugs",
        this.id,
        trade_name_new,
        international_name_new,
        active_ingredient_new
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
