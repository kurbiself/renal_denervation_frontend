<template>
  <div class="modal-overlay2">
    <div class="modal-content2">
      <div class="modal-body2">
        <form id="AddForm" @submit.prevent>
          <table>
            <tbody>
              <tr>
                <th>
                  Полное наименование<span class="required-field">*</span>
                </th>
                <th>
                  <textarea
                    class="form-textarea"
                    v-model.lazy.trim="name_new"
                    required
                  />
                  <span v-if="errors.name" class="error-message">{{
                    errors.name
                  }}</span>
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div class="modal-buttons2">
        <button
          class="agree_button"
          type="button"
          title="Сохранить"
          @click="validateAndSave"
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
  data() {
    return {
      name_new: null,
      pharmacological_group_id_new: null,
      errors: {
        name: "",
      },
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        name_new: this.name_new,
      });
      this.$emit(
        "add_new_pharm_group",
        this.name_new,
      );
    },
    onCancel() {
      this.$emit("cancel");
    },
    validateForm() {
      let isValid = true;

      this.errors = {
        name: "",
      };

      if (!this.name_new || this.name_new.trim() === "") {
        this.errors.name = "Поле обязательно для заполнения";
        isValid = false;
      }

      return isValid;
    },
    validateAndSave() {
      if (this.validateForm()) {
        this.onSave();
      }
    },
  },
};
</script>
