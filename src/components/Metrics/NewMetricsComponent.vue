<template>
  <div>
    <form class="form-container" id="AddForm">
      <table>
        <tbody>
          <tr>
            <th>Название измеряемого признака</th>
            <th>
              <textarea
                class="form-textarea"
                form="AddForm"
                v-model.lazy.trim="fullname_new"
              />
            </th>
          </tr>
          <tr>
            <th>Краткое название</th>
            <th>
              <textarea
                form="AddForm"
                class="form-textarea"
                v-model.lazy.trim="shortname_new"
              />
            </th>
          </tr>
          <tr>
            <th>Тип</th>
            <th>
              <select
                form="AddForm"
                class="form-select"
                v-model="measurement_type_new"
              >
                <option measurement_type_new="количественный">
                  количественный
                </option>
                <option measurement_type_new="качественный">
                  качественный
                </option>
                <option measurement_type_new="бинарный">бинарный</option>
                <option measurement_type_new="описательный">
                  описательный
                </option>
              </select>
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
export default {
  data() {
    return {
      fullname_new: null,
      shortname_new: null,
      measurement_type_new: null,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой:", {
        fullname: this.fullname_new,
        shortname: this.shortname_new,
        measurement_type: this.measurement_type_new,
      });
      this.$emit("add_item", {
        fullname: this.fullname_new,
        shortname: this.shortname_new,
        measurement_type: this.measurement_type_new,
      });

    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
