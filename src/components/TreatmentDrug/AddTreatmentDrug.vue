<template>
  <div>
    <form id="AddForm" class="form-container">
      <table class="form-table">
        <tbody>
          <tr>
            <th>Выберите лекарство</th>
            <th>
              <select form="AddForm" class="form-select" v-model="medicine_new">
                <option disabled value="">Выберите лекарство</option>
                <variants-drugs
                  @loaded="handleTemplatesLoaded"
                  
                />
              </select>
              <span v-if="!templatesLoaded">Загрузка шаблонов...</span>
            </th>
          </tr>
          <tr>
            <th>Доза</th>
            <th>
              <input type="number" class="form-input" v-model.number="dose_new" />
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
import VariantsDrugs from "./VariantsDrugs.vue";
export default {
  props: {
    point_id: { type: Number },
  },
  data() {
    return {
      medicine_new: null,
      dose_new: null,
      taking_medicine_morning_new: false,
      taking_medicine_day_new: false,
      taking_medicine_evening_new: false,
      taking_medicine_night_new: false,
      note_new: null,
    };
  },
  components: { VariantsDrugs },
  methods: {
    async newTreatmentDrug() {
      try {
        await this.$http.post(
          "treatments-drug/",
          {
            check_point_id: this.point_id,
            type_stage: "Фармакотерапия",
            medicine: this.medicine_new,
            note: this.note_new,
            dose: this.dose_new,
            taking_medicine_morning: this.taking_medicine_morning_new,
            taking_medicine_day: this.taking_medicine_day_new,
            taking_medicine_evening: this.taking_medicine_evening_new,
            taking_medicine_night: this.taking_medicine_night_new,
          },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    handleTemplatesLoaded() {
      this.templatesLoaded = true;
    },
    onSave() {
      if (!this.templatesLoaded) {
        alert("Дождитесь загрузки шаблонов");
        return;
      }

      if (!this.medicine_new) {
        alert("Пожалуйста, выберите шаблон исследования");
        return;
      }
      this.newTreatmentDrug();
      this.onCancel();
    },
    onCancel() {
      this.$router.push(`/pointdetails/${this.point_id}`);
    },
  },
};
</script>
