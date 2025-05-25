<template>
  <div>
    <form id="EditForm" class="form-container">
      <table class="form-table">
        <tbody>
          <tr>
            <th>Код<span class="required-field">*</span></th>
            <th>
              <textarea
                class="form-textarea"
                form="EditForm"
                v-model.lazy.trim="code_new"
                required
              />
              <span v-if="errors.code" class="error-message">{{
                errors.code
              }}</span>
            </th>
          </tr>
          <tr>
            <th>Дата рождения<span class="required-field">*</span></th>
            <th>
              <input
                class="form-input"
                form="EditForm"
                type="date"
                v-model="birth_new"
                required
              />
              <span v-if="errors.birth" class="error-message">{{
                errors.birth
              }}</span>
            </th>
          </tr>
          <tr>
            <th>Пол<span class="required-field">*</span></th>
            <th>
              <select
                class="form-select"
                form="EditForm"
                v-model="gender_new"
                required
              >
                <option type_point_new="Мужской">Мужской</option>
                <option type_point_new="Женский">Женский</option>
                />
              </select>
              <span v-if="errors.gender" class="error-message">{{
                errors.gender
              }}</span>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="form-actions">
        <button
          class="agree_button"
          type="button"
          form="EditForm"
          title="Сохранить"
          @click="validateAndSave"
        >
          ✔️
        </button>
        <button
          class="cancel_button"
          type="button"
          form="EditForm"
          title="Отменить"
          @click="onCancel"
        >
          ❌
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    birth: {
      type: String,
    },
  },
  data() {
    return {
      code_new: this.code,
      gender_new: this.gender,
      birth_new: this.birth,
      errors: {
        code: "",
        gender: "",
        birth: "",
      },
    };
  },
  methods: {
    onSave() {
      this.$emit("add_item", this.code_new, this.gender_new, this.birth_new);
    },
    onCancel() {
      this.$emit("cancel_item");
    },
    validateForm() {
      let isValid = true;

      this.errors = {
        code: "",
        gender: "",
        birth: "",
      };

      if (!this.code_new || this.code_new.trim() === "") {
        this.errors.code = "Поле обязательно для заполнения";
        isValid = false;
      }
      if (!this.gender_new) {
        this.errors.gender = "Поле обязательно для заполнения";
        isValid = false;
      }
      if (!this.birth_new) {
        this.errors.birth = "Поле обязательно для заполнения";
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
