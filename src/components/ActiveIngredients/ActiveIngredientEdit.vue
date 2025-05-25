<template>
  <div class="modal-overlay2" @click.self="onCancel">
    <div class="modal-content2">
      <form id="EditForm" @submit.prevent>
        <table class="table-edit">
          <tbody class="modal-body2">
            <tr>
              <th>Название</th>
              <th>
                <textarea v-model.lazy.trim="name_new" />
              </th>
            </tr>
            <tr>
              <th>Активное вещество</th>
              <th>
                <select form="EditForm" v-model="pharmacological_group_id_new">
                  <variants-pharm-groups
                    :selected="pharmacological_group_id_new"
                  />
                </select>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
      <div class="modal-buttons2">
        <button
          class="agree_button"
          type="button"
          title="Сохранить"
          @click="onSave"
        >
          ✔️
        </button>
        <button
          class="cancel_button"
          type="button"
          title="Отменить"
          @click="onCancel"
        >
          ❌
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VariantsPharmGroups from "./VariantsPharmGroups.vue";
export default {
  components: { VariantsPharmGroups },
  props: {
    name: {
      type: String,
    },
    pharmacological_group_id: {
      type: Number,
    },
  },
  data() {
    return {
      name_new: this.name,
      pharmacological_group_id_new: this.pharmacological_group_id,
    };
  },
  methods: {
    onSave() {
      console.log(
        "Данные перед отправкой в edit (добавить активное вещество):",
        {
          name_new: this.name,
          pharmacological_group_id_new: this.pharmacological_group_id,
        }
      );
      this.$emit(
        "edit_ingredient_component",
        this.name_new,
        this.pharmacological_group_id_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
