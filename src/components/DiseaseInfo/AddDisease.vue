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
                    v-model.lazy.trim="fullname_new"
                    required
                  />
                  <span v-if="errors.fullname" class="error-message">{{
                    errors.fullname
                  }}</span>
                </th>
              </tr>
              <tr>
                <th>Короткое наименование</th>
                <th>
                  <textarea v-model.lazy.trim="shortname_new" />
                </th>
              </tr>
              <tr>
                <th>Код МКБ 10</th>
                <th>
                  <textarea v-model.lazy.trim="code_ICD_10_new" />
                </th>
              </tr>
              <tr>
                <th>Примечание</th>
                <th>
                  <textarea v-model.lazy.trim="note_new" />
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
      fullname_new: null,
      shortname_new: null,
      code_ICD_10_new: null,
      note_new: null,
      errors: {
        fullname: "",
      },
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        fullname_new: this.fullname_new,
        shortname_new: this.shortname_new,
        code_ICD_10_new: this.code_ICD_10_new,
        note_new: this.note_new,
      });
      this.$emit(
        "add_diseases",
        this.fullname_new,
        this.shortname_new,
        this.code_ICD_10_new,
        this.note_new
      );
    },
    onCancel() {
      this.$emit("cancel");
    },
    validateForm() {
      let isValid = true;

      this.errors = {
        fullname: "",
      };

      if (!this.fullname_new || this.fullname_new.trim() === "") {
        this.errors.fullname = "Поле обязательно для заполнения";
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
