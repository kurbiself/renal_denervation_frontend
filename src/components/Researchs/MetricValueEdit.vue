<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table>
        <tbody>
          <tr v-if="measurement_type === 'количественный'">
            <th>Значение</th>
            <th>
              <input
                form="EditForm"
                v-model.number="value_numerical_new"
                type="number"
                class="form-input"
              />
            </th>
          </tr>
          <tr v-if="measurement_type === 'бинарный'">
            <th>Значение?</th>
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
          <tr v-if="measurement_type === 'качественный'">
            <th>Значение</th>
            <th>
              <select form="EditForm" class="form-select" v-model="value_qualitative_id_new" multiple  >
                <variants-qualitative name="variants-qualitative" :selected="value_qualitative_id_new" />
              </select>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea form="EditForm" v-model.lazy.trim="note_new" />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
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
</template>

<script>
import VariantsQualitative from "../Metrics/VariantsQualitative.vue";
export default {
  components: { VariantsQualitative },
  props: {
    value_numerical: {
      type: Number,
    },
    value_qualitative_id: {
      type: Array,
      default: () => []

    },
    value_binary: {
      type: Boolean,
    },
    value_descriptive: {
      type: String,
    },
    note: {
      type: String,
    },
    measurement_type: {
      type: String,
    },
  },
  data() {
    return {
      value_numerical_new: this.value_numerical,
      value_qualitative_id_new: [...this.value_qualitative_id] || [],
      value_binary_new: this.value_binary,
      value_descriptive_new: this.value_descriptive,
      note_new: this.note,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в About:", {
        value_numerical_new: this.value_numerical_new,
        value_qualitative_id_new: this.value_qualitative_id_new,
        value_binary_new: this.value_binary_new,
        value_descriptive_new: this.value_descriptive_new,
        note_new: this.note_new,
      });
      this.$emit(
        "edit_metric_value_component",
        this.value_numerical_new,
        this.value_qualitative_id_new,
        this.value_binary_new,
        this.value_descriptive_new,
        this.note_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
