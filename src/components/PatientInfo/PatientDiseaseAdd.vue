<template>
    <div>
      <form id="EditForm" @submit.prevent>
        <table>
          <tbody>
            <tr>
              <th>Заболевание</th>
              <th>
                <select v-model="disease_new">
                  <variants-disease name="diseases" :selected="disease_new" />
                </select>
              </th>
            </tr>
            <tr>
              <th>Начало заболевания</th>
              <th>
                <input v-model.number="year_start_new" type="number" />
              </th>
            </tr>
            <tr>
              <th>Значимость</th>
              <th>
                <select v-model="type_disease_new">
                  <option type_disease_new="Основное">Основное</option>
                  <option type_disease_new="Сопутствующее">Сопутствующее</option>
                </select>
              </th>
            </tr>
            <tr>
              <th>Примечание</th>
              <th>
                <textarea
                  v-model.lazy.trim="note_new"
                />
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
  import VariantsDisease from "./VariantsDisease.vue";
  export default {
    components: { VariantsDisease },

    data() {
      return {
        disease_new: 1,
        year_start_new: null,
        type_disease_new: null,
        note_new: null,
      };
    },
    methods: {
      onSave() {
        console.log("Данные перед отправкой в add (добавить заболевание):", {
          disease: this.disease_new,
          year_start: this.year_start_new,
          type_disease: this.type_disease_new,
          note_new: this.note,
        });
        this.$emit(
          "add_diseases",
          this.disease_new,
          this.year_start_new,
          this.type_disease_new,
          this.note_new
        );
      },
      onCancel() {
        this.$emit("cancel");
      },
    },
  };
  </script>
  