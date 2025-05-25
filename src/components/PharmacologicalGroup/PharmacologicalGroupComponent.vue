<template>
  <tr v-if="!edit_mode">
    <td>{{ name }}</td>
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
          <p>
            Вы уверены, что хотите удалить фармакологическую группу? Все
            связанные с ней активные вещества и лекарства так же будут удалены!
          </p>
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
  <pharmacological-group-edit
    v-else
    :name="this.name"
    @edit_pharm_group_component="edit_pharm_group_component"
    @cancel_item="cancel_item"
  />
</template>

<script>
import PharmacologicalGroupEdit from "./PharmacologicalGroupEdit.vue";
export default {
  components: { PharmacologicalGroupEdit },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
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
      this.$emit("delete_pharm_group", this.id);
      this.loading = false;
    },
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
      }
    },
    edit_pharm_group_component(name_new) {
      console.log(
        "Данные изменения заболевания перед отправкой в компоненте PharmacologicalGroup:",
        {
          name_new,
        }
      );
      this.$emit("edit_pharm_group", this.id, name_new);
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
