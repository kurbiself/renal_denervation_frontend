<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Полное наименование</th>
            <th>
              <textarea form="EditForm" v-model.lazy.trim="fullname_new" />
            </th>
          </tr>
          <tr>
            <th>Краткое наименование</th>
            <th>
              <textarea form="EditForm" v-model.lazy.trim="shortname_new" />
            </th>
          </tr>
          <tr v-if="measurement_type === 'количественный'">
            <th>Верхняя граница нормы</th>
            <th>
              <input
                form="EditForm"
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
                form="EditForm"
                v-model.number="reference_min_numerical_new"
                type="number"
                class="form-input"
              />
            </th>
          </tr>
          <tr v-if="measurement_type === 'количественный'">
            <th>Единицы измерения</th>
            <th>
              <select form="EditForm" class="form-select" v-model="unit_for_metric_new">
                <variants-units name="units" :selected="unit_for_metric_new" />
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
import VariantsUnits from "../Metrics/VariantsUnits.vue";
export default {
  components: { VariantsQualitative, VariantsUnits },
  props: {
    fullname: {
      type: String,
      required: true,
    },
    shortname: {
      type: String,
      required: true,
    },
    measurement_type: {
      type: String,
      required: true,
    },
    reference_max_numerical: {
      type: Number,
    },
    reference_min_numerical: {
      type: Number,
    },
    reference_binary: {
      type: Boolean,
    },
    unit_for_metric: {
      type: Number,
    },
    note:{
      type: String
    }
  },
  data() {
    return {
      fullname_new: this.fullname,
      shortname_new: this.shortname,
      reference_max_numerical_new: this.reference_max_numerical,
      reference_min_numerical_new: this.reference_min_numerical,
      note_new: this.note,
      reference_binary_new: this.reference_binary,
      unit_for_metric_new: this.unit_for_metric,
    };
  },
  methods: {
    onSave() {
      this.$emit(
        "edit_metric_component",
        this.fullname_new,
        this.shortname_new,
        this.reference_max_numerical_new,
        this.reference_min_numerical_new,
        this.reference_binary_new,
        this.unit_for_metric_new,
        this.note_new,
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
