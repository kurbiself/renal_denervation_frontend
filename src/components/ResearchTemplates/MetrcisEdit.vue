<template>
  <div class="modal-overlay2" @click.self="onCancel">
    <div class="modal-content2">
      <form id="EditForm" @submit.prevent>
        <table class="table-edit">
          <tbody class="modal-body2">
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
                />
              </th>
            </tr>
            <tr v-if="measurement_type === 'количественный'">
              <th>Единицы измерения</th>
              <th>
                <select form="EditForm" v-model="unit_for_metric_new">
                  <variants-units
                    name="units"
                    :selected="unit_for_metric_new"
                  />
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
              <th>Качественные признаки</th>
              <div
                v-for="variant in variants_qualitative_new"
                :key="variant.id"
                class="ablation-edit"
              >
                <input
                  v-model="variant.value"
                  placeholder="Название признака"
                />
                <button
                  @click="markForRemoval(variant.id)"
                  class="remove-button"
                >
                  ×
                </button>
              </div>
            </tr>
            <tr>
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
                <textarea form="EditForm" v-model.lazy.trim="note_new" />
              </th>
            </tr>
          </tbody>
        </table>
      </form>
      <div class="modal-buttons2">
        <button class="agree_button" type="button" title="Сохранить" @click="onSave">
          ✔️
        </button>
        <button class="cancel_button" type="button" title="Отменить" @click="onCancel">
          ❌
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VariantsUnits from "../Metrics/VariantsUnits.vue";
export default {
  components: { VariantsUnits },
  props: {
    metric_id: {
      type: Number,
    },
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
    variants_qualitative: {
      type: Object,
    },
    note: {
      type: String,
    },
  },
  computed: {
    hasVariantQualitative() {
      return Object.keys(this.variants_qualitative_new).length > 0;
    },
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
      variants_qualitative_new: this.variants_qualitative || [],

      markedForRemoval: [],

      newQualitativeValue: "",
      qualitative_value: [],
      referenceQualitative: false,
    };
  },
  methods: {
    async onSave() {
      await Promise.all(
        this.markedForRemoval.map((id) => this.deleteQualitativeValue(id))
      );
      await Promise.all(
        this.qualitative_value.map((value) => this.addVariantQualitative(value))
      );
      

      this.$emit(
        "edit_metric_component",
        this.fullname_new,
        this.shortname_new,
        this.reference_max_numerical_new,
        this.reference_min_numerical_new,
        this.reference_binary_new,
        this.unit_for_metric_new,
        this.note_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
    async deleteQualitativeValue(id) {
      try {
        await this.$http.delete("variants-qualitative/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addVariantQualitative(value) {
      try {
        console.log(
          "addVariantQualitative",
          this.metric_id,
          value.reference,
          value.value
        );
        await this.$http.post(
          "variants-qualitative/",
          {
            metric_id: this.metric_id,
            value: value.value,
            reference: value.reference,
          },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    add_qualitative_value() {
      if (!this.newQualitativeValue.trim()) return;
      this.qualitative_value.push({
        value: this.newQualitativeValue.trim(),
        reference: this.referenceQualitative,
      });
      console.log("qualitative_value в edit", this.qualitative_value);
      this.newQualitativeValue = "";
      this.referenceQualitative = false;
    },
    removeNewQualitativeValue(index) {
      this.qualitative_value.splice(index, 1);
    },
    markForRemoval(id) {
      this.markedForRemoval.push(id);
      this.variants_qualitative_new = this.variants_qualitative_new.filter(
        (variant) => variant.id !== id
      );
    },
  },
};
</script>
