<template>
  <div class="modal-overlay2" @click.self="onCancel">
    <div class="modal-content2">
      <form id="EditForm" @submit.prevent>
        <table class="table-edit">
          <tbody class="modal-body2">
            <tr>
              <th>Полное наименование</th>
              <th>
                <textarea v-model.lazy.trim="fullname_new" />
              </th>
            </tr>
            <tr>
              <th>Короткое наименование</th>
              <th>
                <textarea v-model.lazy.trim="shortname_new" />
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
    fullname: {
      type: String,
    },
    shortname: {
      type: String,
    },
  },
  data() {
    return {
      fullname_new: this.fullname,
      shortname_new: this.shortname,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        fullname_new: this.fullname_new,
        shortname_new: this.shortname_new,
      });
      this.$emit("edit_units_component", this.fullname_new, this.shortname_new);
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
