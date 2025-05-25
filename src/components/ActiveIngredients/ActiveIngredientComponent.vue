<template>
  <tr v-if="!edit_mode">
    <td>{{ name }}</td>
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
        @click.self="showModal = true"
      ></button>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить активное вещество?</p>
          <div class="modal-actions">
            <button @click="onDelete" :disabled="loading" class="delete-btn">
              {{ loading ? "Удаление..." : "Да, удалить" }}
            </button>
            <button @click="closeModal" :disabled="loading" class="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </td>
  </tr>
  <active-ingredient-edit
    v-else
    :name="this.name"
    :pharmacological_group_id="this.pharmacological_group_id"
    @edit_ingredient_component="edit_ingredient_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import ActiveIngredientEdit from "./ActiveIngredientEdit.vue";
export default {
  components: { ActiveIngredientEdit },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
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
      showModal: false,
      loading: false,
    };
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    onDelete() {
      this.loading = true;
      this.$emit("delete_ingredient", this.id);
      this.loading = false;
    },
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
      }
    },
    edit_ingredient_component(name_new, pharmacological_group_id) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте Drugs:",
        {
          name_new,
          pharmacological_group_id,
        }
      );
      this.$emit(
        "edit_ingredient",
        this.id,
        name_new,
        pharmacological_group_id
      );
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
