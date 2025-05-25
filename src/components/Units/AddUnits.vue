<template>
  <div class="modal-overlay2">
    <div class="modal-content2">
      <form id="AddForm" @submit.prevent>
        <table>
          <tbody>
            <tr>
              <th>Полное наименование</th>
              <th>
                <textarea v-model.lazy.trim="fullname_new" />
              </th>
            </tr>
            <tr>
              <th>Короткое наименование<span class="required-field">*</span></th>
              <th>
                <textarea v-model.lazy.trim="shortname_new" required/>
                <span v-if="errors.shortname" class="error-message">{{ errors.shortname }}</span>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
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
</template>

<script>
export default {
  data() {
    return {
      fullname_new: null,
      shortname_new: null,
      errors: {
        shortname: '',
      }
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        fullname_new: this.fullname_new,
        shortname_new: this.shortname_new,
      });
      this.$emit("add_units", this.fullname_new, this.shortname_new);
    },
    onCancel() {
      this.$emit("cancel");
    },
    validateForm() {
      let isValid = true;
      
      this.errors = {
        shortname: '',
      };
      
      if (!this.shortname_new || this.shortname_new.trim() === '') {
        this.errors.shortname = 'Поле обязательно для заполнения';
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
