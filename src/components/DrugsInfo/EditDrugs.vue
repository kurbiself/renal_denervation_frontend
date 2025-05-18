<template>
  <div>
    <form id="EditForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Торговое название</th>
            <th>
              <textarea v-model.lazy.trim="trade_name_new" />
            </th>
          </tr>
          <tr>
            <th>Международное непатентованное название</th>
            <th>
              <textarea v-model.lazy.trim="international_name_new" />
            </th>
          </tr>
          <tr>
            <th>Активное вещество</th>
            <th>
              <select
                form="EditForm"
                class="form-select"
                v-model="active_ingredient_new"
              >
                <variants-active-ingredient
                  name="active-ingredients"
                  :selected="active_ingredient_new"
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
      title="Сохранить"
      @click="onSave"
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
      trade_name_new: this.trade_name,
      international_name_new: this.international_name,
      active_ingredient_new: this.active_ingredient,
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
        "edit_drugs_component",
        this.trade_name_new,
        this.international_name_new,
        this.active_ingredient_new
      );
    },
    onCancel() {
      this.$emit("cancel_item");
    },
  },
};
</script>
