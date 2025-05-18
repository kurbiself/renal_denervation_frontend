<template>
  <div>
    <form id="EditForm">
      <table>
        <tbody>
          <tr>
            <th>Тип</th>
            <th>
              <select form="EditForm" v-model="type_point_new">
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
              <!-- <textarea form="EditForm" v-model.lazy.trim="date_of_receipt_new" /> -->
              <input
                form="EditForm"
                type="date"
                v-model="date_of_receipt_new"
              />
            </th>
          </tr>
          <tr>
            <th>Выписка</th>
            <th>
              <input
                form="EditForm"
                type="date"
                v-model="date_of_discharge_new"
              />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
    <button
      class="agree_button"
      type="button"
      form="EditForm"
      title="Сохранить"
      @click="onSave"
    >
      ✔️
    </button>
    <button
      class="cancel_button"
      type="button"
      form="EditForm"
      title="Отменить"
      @click="onСancel"
    >
      ❌
    </button>
  </div>
</template>

<script>
import VariantsTypeCheckPoint from "./VariantsTypeCheckPoint.vue";
export default {
  components: { VariantsTypeCheckPoint },
  props: {
    date_of_receipt: {
      type: Date,
      required: true,
    },
    date_of_discharge: {
      type: Date,
      required: true,
    },
    type_point: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type_point_new: this.type_point,
      date_of_receipt_new: this.date_of_receipt,
      date_of_discharge_new: this.date_of_discharge,
    };
  },
  methods: {
    onSave() {
      this.$emit(
        "edit_item",
        this.date_of_receipt_new,
        this.date_of_discharge_new,
        this.type_point_new
      );
    },
    onСancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
