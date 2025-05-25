<template>
  <div>
    <form class="form-container" id="AddForm" @submit.prevent>
      <table class="form-table">
        <tbody>
          <tr>
            <th>Наименование шаблона<span class="required-field">*</span></th>
            <th>
              <textarea
                class="form-textarea"
                v-model.lazy.trim="name_new"
                required
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </th>
          </tr>
          <tr>
            <th>Тип исследования<span class="required-field">*</span></th>
            <th>
              <select
                class="form-select"
                v-model="type_research_new"
                required
              >
                <option type_research_new="Лабораторное">Лабораторное</option>
                <option type_research_new="Инструментальное">
                  Инструментальное
                </option>
              </select>
              <span v-if="errors.type_research" class="error-message">{{ errors.type_research }}</span>
            </th>
          </tr>
          <tr>
            <th>Приоритет<span class="required-field">*</span></th>
            <th>
              <select
                class="form-select"
                v-model="obligation_of_research_new"
                required
              >
                <option obligation_of_research_new="Обязательное">Обязательное</option>
                <option obligation_of_research_new="Необязательное">
                  Необязательное
                </option>
              </select>
              <span v-if="errors.obligation_of_research" class="error-message">{{ errors.obligation_of_research }}</span>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea
                form="AddForm"
                class="form-textarea"
                v-model.lazy.trim="note_new"
              />
            </th>
          </tr>
        </tbody>
      </table>
      <div class="form-actions">
        <button
          class="agree_button"
          type="button"
          form="AddForm"
          title="Сохранить"
          @click="validateAndSave"
        >
          ✔️
        </button>
        <button
          class="cancel_button"
          type="button"
          form="AddForm"
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
  data() {
    return {
      name_new: null,
      type_research_new: null,
      obligation_of_research_new: 1,
      note_new: null,
      errors: {
        name: '',
        type_research:'',
        obligation_of_research:'',
      }
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой:", {
        name: this.name_new,
        type_research: this.type_research_new,
        obligation_of_research: this.obligation_of_research_new,
        note: this.note_new,
      });
      this.$emit(
        "add_item",
        this.name_new,
        this.type_research_new,
        this.obligation_of_research_new,
        this.note_new
      );
      this.$emit("cancel_item");
    },
    onCancel() {
      this.$emit("cancel_item");
    },
    validateForm() {
      let isValid = true;
      
      this.errors = {
        name: '',
        type_research:'',
        obligation_of_research:'',
      };
      
      if (!this.name_new || this.name_new.trim() === '') {
        this.errors.name = 'Поле обязательно для заполнения';
        isValid = false;
      }
      if (!this.type_research_new) {
        this.errors.type_research = 'Поле обязательно для заполнения';
        isValid = false;
      }
      if (!this.obligation_of_research_new) {
        this.errors.obligation_of_research = 'Поле обязательно для заполнения';
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

