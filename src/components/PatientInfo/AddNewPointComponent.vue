<template>
  <div>
    <form class="form-container" id="AddForm">
      <table>
        <tbody>
          <tr>
            <th>Тип</th>
            <th>
              <select form="AddForm" v-model="type_point_new" class="form-select">
                <variants-type-check-point
                  name="type-checkpoints"
                  :selected="type_point_new"
                />
              </select>
            </th>
          </tr>
          <tr>
            <th>Поступление</th>
            <th>
              <input form="AddForm" type="date" class="form-input" v-model="date_of_receipt_new" />
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
              <textarea form="AddForm" class="form-textarea" v-model.lazy.trim="hospital_id_new" />
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea form="AddForm" class="form-textarea" v-model.lazy.trim="note_new" />
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
import VariantsTypeCheckPoint from "./VariantsTypeCheckPoint.vue";
export default {
  components: { VariantsTypeCheckPoint },
  data() {
    return {
      type_point_new: 1,
      date_of_receipt_new: null,
      date_of_discharge_new: null,
      hospital_id_new: null,
      note_new: null,
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
  },
};
</script>
