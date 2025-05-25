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
        @click.self="showModal = true"
      ></button>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить лекарство?</p>
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
      <!-- <button
        type="button"
        class="delete_button_design"
        @click="onDelete"
      ></button> -->
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
      this.$emit("delete_drugs", this.id);
      this.loading = false;
    },
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
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
          active_ingredient_new,
        }
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
