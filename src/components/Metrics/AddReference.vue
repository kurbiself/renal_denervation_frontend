<template>
  <div class="form-container" @submit.prevent>
    <form id="AddForm">
      <table class="add-table">
        <tbody>
          <tr v-if="measurement_type === 'количественный'">
            <th>Верхняя граница нормы</th>
            <th>
              <input
                form="AddForm"
                v-model.number="reference_max_numerical_new"
                type="number"
                class="form-input"
              />
            </th>
          </tr>
          <tr v-if="measurement_type === 'количественный'">
            <th>Нижняя граница нормы</th>
            <th>
              <input
                form="AddForm"
                v-model.number="reference_min_numerical_new"
                type="number"
                class="form-input"
              />
            </th>
          </tr>
          <tr v-if="measurement_type === 'количественный'">
            <th>Единицы измерения</th>
            <th>
              <select form="AddForm" class="form-select" v-model="units_new">
                <variants-units name="units" :selected="units_new" />
              </select>
            </th>
          </tr>
          <tr v-if="measurement_type === 'бинарный'">
            <th>Это норма?</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="reference_binary_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="reference_binary_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>
          <tr v-if="measurement_type === 'качественный'">
            <th>Добавьте значения качественного признака</th>
            <th>
              <div
                v-for="(item, index) in qualitative_value"
                :key="'new-' + index"
                class="ablation-edit"
              >
                <input v-model="item.value" placeholder="Название" />
                <label>Признак соответсвует норме?</label>
                <label
                  ><input
                    type="radio"
                    class="radio-group"
                    v-model="item.reference"
                    :value="true"
                  />Да</label
                >
                <label>
                  <input
                    type="radio"
                    class="radio-group"
                    v-model="item.reference"
                    :value="false"
                  />
                  Нет
                </label>

                <button
                  @click="removeNewQualitativeValue(index)"
                  class="remove-button"
                >
                  ×
                </button>
              </div>
              <div>
                <div class="ablation-edit">
                  <input
                    v-model="newQualitativeValue"
                    placeholder="Введите новый признак"
                    @keyup.enter="add_qualitative_value"
                  />
                  <button @click="add_qualitative_value" class="add-button">
                    Добавить
                  </button>
                </div>
              </div>
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
import VariantsUnits from "./VariantsUnits.vue";
export default {
  components: { VariantsUnits },
  props: {
    measurement_type: {
      type: String,
    },
    metric_id: {
      type: Number,
    },
  },
  data() {
    return {
      reference_max_numerical_new: null,
      reference_min_numerical_new: null,
      note_new: null,
      reference_binary_new: null,
      units_new: null,
      newQualitativeValue: "",
      qualitative_value: [],
      referenceQualitative: false,
    };
  },
  methods: {
    add_qualitative_value() {
      if (!this.newQualitativeValue.trim()) return;
      this.qualitative_value.push({
        value: this.newQualitativeValue.trim(),
        reference: this.referenceQualitative,
      });
      console.log('qualitative_value',this.qualitative_value)
      this.newQualitativeValue = "";
      this.referenceQualitative = false;
    },
    onSave() {
      console.log("Данные перед отправкой в NewMetrics:", {
        reference_max_numerical_new: this.reference_max_numerical_new,
        reference_min_numerical_new: this.reference_min_numerical_new,
        reference_binary_new: this.reference_binary_new,
        note_new: this.note_new,
        units_new: this.units_new,
        qualitative_value: this.qualitative_value,
        metric_id: this.metric_id,
      });
      this.$emit(
        "supplement_item",
        {
          reference_max_numerical: this.reference_max_numerical_new,
          reference_min_numerical: this.reference_min_numerical_new,
          reference_binary: this.reference_binary_new,
          note: this.note_new,
          unit_for_metric: this.units_new,
        },
        this.qualitative_value
      );

    },
    removeNewQualitativeValue(index) {
      this.qualitative_value.splice(index, 1);
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
