<template>
  <div>
    <form class="form-container" id="AddForm">
      <table class="form-table">
        <tbody>
          <tr>
            <th>Тип<span class="required-field">*</span></th>
            <th>
              <select
                form="AddForm"
                v-model="type_point_new"
                class="form-select"
                required
              >
                <variants-type-check-point
                  name="type-checkpoints"
                  :selected="type_point_new"
                />
              </select>
              <span v-if="errors.type_point" class="error-message">{{
                errors.type_point
              }}</span>
            </th>
          </tr>
          <tr>
            <th>Поступление</th>
            <th>
              <input
                form="AddForm"
                type="date"
                class="form-input"
                v-model="date_of_receipt_new"
              />
            </th>
          </tr>
          <tr>
            <th>Выписка</th>
            <th>
              <input
                form="AddForm"
                type="date"
                class="form-input"
                v-model="date_of_discharge_new"
              />
            </th>
          </tr>
          <tr>
            <th>Лечебное учреждение</th>
            <th>
              <select
                form="AddForm"
                v-model="hospital_id_new"
                class="form-select"
              >
                <variants-hospitals />
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
import VariantsTypeCheckPoint from "./VariantsTypeCheckPoint.vue";
import VariantsHospitals from "./VariantsHospitals.vue";
export default {
  components: { VariantsTypeCheckPoint, VariantsHospitals },
  data() {
    return {
      type_point_new: null,
      date_of_receipt_new: null,
      date_of_discharge_new: null,
      hospital_id_new: null,
      note_new: null,
      errors: {
        type_point: "",
      },
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой:", {
        date_of_receipt: this.date_of_receipt_new,
        date_of_discharge: this.date_of_discharge_new,
        type_point: this.type_point_new,
        hospital_id: this.hospital_id_new,
        note: this.note_new,
      });
      this.$emit(
        "add_item",
        this.date_of_receipt_new,
        this.date_of_discharge_new,
        this.type_point_new,
        this.hospital_id_new,
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
        type_point: "",
      };

      if (!this.type_point_new) {
        this.errors.type_point = "Поле обязательно для заполнения";
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
