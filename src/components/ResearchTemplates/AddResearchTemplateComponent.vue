<template>
  <div>
    <form id="AddForm" class="form-container">
      <table class="form-table">
        <tbody>
          <tr>
            <th>Наименование шаблона</th>
            <th>
              <textarea
                form="AddForm"
                class="form-textarea"
                v-model.lazy.trim="name_new"
              />
            </th>
          </tr>
          <tr>
            <th>Тип исследования</th>
            <th>
              <select
                form="AddForm"
                class="form-select"
                v-model="type_research_new"
              >
                <option type_disease_new="Лабораторное">Лабораторное</option>
                <option type_disease_new="Инструментальное">
                  Инструментальное
                </option>
              </select>
            </th>
          </tr>
          <tr>
            <th>Приоритет</th>
            <th>
              <select
                form="AddForm"
                class="form-select"
                v-model="obligation_of_research_new"
              >
                <option type_disease_new="Обязательное">Обязательное</option>
                <option type_disease_new="Необязательное">
                  Необязательное
                </option>
              </select>
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
          @click="onSave"
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
  },
};
</script>

