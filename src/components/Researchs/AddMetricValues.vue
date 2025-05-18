<template>
  <div class="form-container">
    <form id="AddForm">
      <table class="add-table">
        <tbody>
          <tr v-if="metric.measurement_type === 'количественный'">
            <th>Значение</th>
            <th>
              <input
                form="AddForm"
                v-model.number="value_numerical_new"
                type="number"
                class="form-input"
              />
            </th>
          </tr>
          <tr v-if="metric.measurement_type === 'бинарный'">
            <th>Признак присутствует?</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="value_binary_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="value_binary_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>
          <tr v-if="metric.measurement_type === 'описательный'">
            <th>Внесите описание</th>
            <th>
              <textarea
                class="form-textarea"
                v-model.lazy.trim="value_descriptive_new"
              />
            </th>
          </tr>
          <tr v-if="metric.measurement_type === 'качественный'">
            <th>Выберите признак(-и)</th>
            <th>
              <select
                class="form-select"
                v-model="value_qualitative_id_new"
                multiple
                @change="logSelection"
              >
                <option
                  v-for="variant in metric.variants_qualitative"
                  :key="variant.id"
                  :value="variant.id"
                >
                  {{ variant.value }}
                </option>
              </select>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea class="form-textarea" v-model.lazy.trim="note_new" />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
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
  </div>
</template>
<script>
import VariantsQualitative from "../Metrics/VariantsQualitative.vue";
export default {
  props: {
    metric: {
      type: Object,
      required: true,
    },
  },
  components: { VariantsQualitative },
  data() {
    return {
      value_numerical_new: null,
      value_binary_new: null,
      value_descriptive_new: null,
      value_qualitative_id_new: [],
      note_new: null,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой!!!!!!!:", {
        value_numerical: this.value_numerical_new,
        value_binary: this.value_binary_new,
        value_descriptive: this.value_descriptive_new,
        value_qualitative_id: this.value_qualitative_id_new,
        note: this.note_new,
      });
      const formData = {
      value_numerical: this.value_numerical_new,
      value_binary: this.value_binary_new,
      value_descriptive: this.value_descriptive_new,
      value_qualitative_id: this.value_qualitative_id_new, // Убедитесь, что это массив
      note: this.note_new,
    };
      this.$emit("add_item_values", 
        formData
      );

      //this.$emit("cancel_item");
    },

    logSelection() {
      console.log("Выбрано:", this.value_qualitative_id_new);
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
