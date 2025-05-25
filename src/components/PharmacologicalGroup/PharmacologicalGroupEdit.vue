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
export default {
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      name_new: this.name,
    };
  },
  methods: {
    onSave() {
      console.log(
        "Данные перед отправкой в edit (добавить активное вещество):",
        {
          name_new: this.name,
        }
      );
      this.$emit("edit_pharm_group_component", this.name_new);
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
