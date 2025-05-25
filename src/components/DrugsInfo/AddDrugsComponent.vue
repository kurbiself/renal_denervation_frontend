<template>
  <div>
    <form class="form-container" id="AddForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Торговое название<span class="required-field">*</span></th>
            <th>
              <textarea class="form-textarea" v-model.lazy.trim="trade_name_new" required />
              <span v-if="errors.trade_name" class="error-message">{{ errors.trade_name }}</span>
            </th>
          </tr>
          <tr>
            <th>Международное непатентованное название<span class="required-field">*</span></th>
            <th>
              <textarea class="form-textarea" v-model.lazy.trim="international_name_new" required />
               <span v-if="errors.international_name" class="error-message">{{ errors.international_name }}</span>
            </th>
          </tr>
          <tr>
            <th>Активное вещество<span class="required-field">*</span></th>
            <th>
              <select
                form="AddForm"
                class="form-select"
                v-model="active_ingredient_new"
                required
              >
                <variants-active-ingredient
                  name="active-ingredients"
                  :selected="active_ingredient_new"
                />
              </select>
              <span v-if="errors.active_ingredient" class="error-message">{{ errors.active_ingredient }}</span>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="form-actions">
        <button
          class="agree_button"
          type="button"
          title="Сохранить"
          @click="validateAndSave"
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
    </form>
  </div>
</template>

<script>
import VariantsActiveIngredient from "./VariantsActiveIngredient.vue";
export default {
  components: { VariantsActiveIngredient },
  props: {
    trade_name: {
      type: String,
    },
    international_name: {
      type: String,
    },
    active_ingredient: {
      type: Number,
    },
  },
  data() {
    return {
      trade_name_new: null,
      international_name_new: null,
      active_ingredient_new: null,
      errors: {
        trade_name: '',
        international_name: '',
        active_ingredient: ''
      }
    };
  },
  methods: {
    onSave() {
      console.log("Данные перед отправкой в edit (добавить лекарство):", {
        trade_name_new: this.trade_name_new,
        international_name_new: this.international_name_new,
        active_ingredient_new: this.active_ingredient_new,
      });
      this.$emit(
        "add_item",
        this.trade_name_new,
        this.international_name_new,
        this.active_ingredient_new
      );
      this.onCancel();
    },
    onCancel() {
      this.$emit("cancel_item");
    },
    validateForm() {
      let isValid = true; //переменная-флаг (она же буллева переменная)
      
      // Сброс предыдущих ошибок
      this.errors = {
        trade_name: '',
        international_name: '',
        active_ingredient: ''
      };
      
      // Проверка торгового названия
      if (!this.trade_name_new || this.trade_name_new.trim() === '') {
        this.errors.trade_name = 'Поле обязательно для заполнения';
        isValid = false;
      }
      
      // Проверка международного названия
      if (!this.international_name_new || this.international_name_new.trim() === '') {
        this.errors.international_name = 'Поле обязательно для заполнения';
        isValid = false;
      }
      
      // Проверка активного вещества
      if (!this.active_ingredient_new) {
        this.errors.active_ingredient = 'Поле обязательно для заполнения';
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



