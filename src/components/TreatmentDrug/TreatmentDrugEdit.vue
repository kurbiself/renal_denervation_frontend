<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Лекарственный препарат</th>
            <th>
              <select v-model="medicine_new">
                <variants-drugs />
              </select>
              {{ medicine_new }}
            </th>
          </tr>
          <tr>
            <th>Доза</th>
            <th>
              <input v-model.number="dose_new" />
            </th>
          </tr>
          <tr>
            <th>Приём утром</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_morning_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_morning_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>

          <tr>
            <th>Приём днём</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_day_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_day_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>

          <tr>
            <th>Приём вечером</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_evening_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_evening_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>

          <tr>
            <th>Приём ночью</th>
            <th>
              <label
                ><input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_night_new"
                  :value="true"
                />Да</label
              >
              <label>
                <input
                  type="radio"
                  class="radio-group"
                  v-model="taking_medicine_night_new"
                  :value="false"
                />
                Нет
              </label>
            </th>
          </tr>

          <tr>
            <th>Примечание</th>
            <th>
              <textarea v-model.lazy.trim="note_new" />
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
import VariantsDrugs from "./VariantsDrugs.vue";
export default {
  props: {
    medicine: { type: Number },
    dose: { type: Float64Array },
    taking_medicine_morning: { type: Boolean },
    taking_medicine_day: { type: Boolean },
    taking_medicine_evening: { type: Boolean },
    taking_medicine_night: { type: Boolean },
    note: { type: String },
  },
  components: { VariantsDrugs },
  data() {
    return {
      medicine_new: this.medicine,
      dose_new: this.dose,
      taking_medicine_morning_new: this.taking_medicine_morning,
      taking_medicine_day_new: this.taking_medicine_day,
      taking_medicine_evening_new: this.taking_medicine_evening,
      taking_medicine_night_new: this.taking_medicine_night,
      note_new: this.note,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        medicine: this.medicine_new,
        dose_new: this.dose_new,
        taking_medicine_morning_new: this.taking_medicine_morning_new,
        taking_medicine_day_new: this.taking_medicine_day_new,
        taking_medicine_evening_new: this.taking_medicine_evening_new,
        taking_medicine_night_new: this.taking_medicine_night_new,
        note_new: this.note_new,
      });
      this.$emit(
        "edit_treatment_drug",
        this.medicine_new,
        this.dose_new,
        this.taking_medicine_morning_new,
        this.taking_medicine_day_new,
        this.taking_medicine_evening_new,
        this.taking_medicine_night_new,
        this.note_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
