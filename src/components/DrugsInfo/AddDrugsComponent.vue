<template>
  <div>
    <form class="form-container" id="AddForm" @submit.prevent>
      <table>
        <tbody>
          <tr>
            <th>Торговое название</th>
            <th>
              <textarea class="form-textarea" v-model.lazy.trim="trade_name_new" />
            </th>
          </tr>
          <tr>
            <th>Международное непатентованное название</th>
            <th>
              <textarea class="form-textarea" v-model.lazy.trim="international_name_new" />
            </th>
          </tr>
          <tr>
            <th>Активное вещество</th>
            <th>
              <select
                form="AddForm"
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
      <div class="form-actions">
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
  },
};
</script>
