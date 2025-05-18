<template>
  <div>
    <form id="AddForm" @submit.prevent>
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
  data() {
    return {
      fullname_new: null,
      shortname_new: null,
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в add (добавить заболевание):", {
        fullname_new: this.fullname_new,
        shortname_new: this.shortname_new,
      });
      this.$emit(
        "add_units",
        this.fullname_new,
        this.shortname_new,
      );
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
