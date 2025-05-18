<template>
  <div>
    <form id="AddForm" class="form-container">
      <table class="form-table">
        <tbody>
          <tr>
            <th>Выберите шаблон исследования</th>
            <th>
              <select
                form="AddForm"
                class="form-select"
                v-model="research_template_id_new"
                
              >
                <option disabled value="">Выберите шаблон</option>
                <variants-research-template
                  @loaded="handleTemplatesLoaded"
                  :selected="research_template_id_new"
                />
              </select>
              <span v-if="!templatesLoaded">Загрузка шаблонов...</span>
            </th>
          </tr>
          <tr>
            <th>Дата исследования</th>
            <th>
              <input
                form="AddForm"
                type="date"
                class="form-input"
                v-model="date_new"
              />
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
import VariantsResearchTemplate from "./VariantsResearchTemplate.vue";
export default {
  data() {
    return {
      research_template_id_new: null,
      date_new: null,
      note_new: null,
      templatesLoaded: false
    };
  },
  components: { VariantsResearchTemplate },
  methods: {
    handleTemplatesLoaded() {
      this.templatesLoaded = true;
    },
    onSave() {
      console.log("Данные перед отправкой:", {
        research_template_id_new: this.research_template_id_new,
        date_new: this.date_new,
        note: this.note_new,
      });
      if (!this.templatesLoaded) {
        alert("Дождитесь загрузки шаблонов");
        return;
      }
      
      if (!this.research_template_id_new) {
        alert("Пожалуйста, выберите шаблон исследования");
        return;
      }
      this.$emit(
        "add_item",
        this.research_template_id_new,
        this.date_new,
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
