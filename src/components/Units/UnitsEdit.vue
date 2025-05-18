<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Полное наименование</th>
            <th>
              <textarea v-model.lazy.trim="fullname_new" />
            </th>
          </tr>
          <tr>
            <th>Короткое наименование</th>
            <th>
              <textarea v-model.lazy.trim="shortname_new" />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
    <button class="agree_button" type="button" title="Сохранить" @click="onSave">
      ✔️
    </button>
    <button class="cancel_button" type="button" title="Отменить" @click="onCancel">
      ❌
    </button>
  </div>
</template>

<script>
export default {
  props: {
    fullname: {
      type: String,
    },
    shortname: {
      type: String,
    }
  },
  data() {
    return {
      fullname_new: this.fullname,
      shortname_new: this.shortname,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        fullname_new: this.fullname_new,
        shortname_new: this.shortname_new,
      });
      this.$emit(
        "edit_units_component",
        this.fullname_new,
        this.shortname_new,
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
