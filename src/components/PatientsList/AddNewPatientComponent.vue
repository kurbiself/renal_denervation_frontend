<template>
    <div>
      <form id="EditForm">
        <table>
          <tbody>
            <tr>
              <th>Код</th>
              <th>
                <textarea form="EditForm" v-model.lazy.trim="code_new" />
              </th>
            </tr>
            <tr>
              <th>Дата рождения</th>
              <th>
                <input form="EditForm" type="date" v-model="birth_new" />
              </th>
            </tr>
            <tr>
              <th>Пол</th>
              <th>
                <select form="EditForm" v-model="gender_new">
                  <option type_point_new="Мужской">Мужской</option>
                  <option type_point_new="Женский">Женский</option>
                  />
                </select>
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
  export default {
    props: {
      code: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
      },
      birth: {
        type: String,
      },
    },
    data() {
      return {
        code_new: this.code,
        gender_new: this.gender,
        birth_new: this.birth,
      };
    },
    methods: {
      onSave() {
      //   console.log("Данные перед отправкой:", {
      //     code: this.code_new,
      //     gender: this.gender_new,
      //     birth: this.birth_new,
      //   });
        this.$emit("add_item", this.code_new, this.gender_new, this.birth_new);
      },
      onСancel() {
        this.$emit("cancel_item");
      },
    },
  };
  </script>
  