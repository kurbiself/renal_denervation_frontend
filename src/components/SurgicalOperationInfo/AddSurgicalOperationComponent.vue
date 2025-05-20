<template>
  <div>
    <form class="form-operation" id="AddForm" @submit.prevent>
      <table class="operation-table">
        <tbody>
          <tr>
            <th>Название</th>
            <th>
              <input v-model.lazy.trim="name_new" />
            </th>
          </tr>
          <tr>
            <th>Дата</th>
            <th>
              <input type="date" v-model="date_new" />
            </th>
          </tr>
          <tr>
            <th>Тип операции</th>
            <th>
              <select v-model="type_stage_new">
                <option value="Операция">Операция</option>
                <option value="Повторная операция">Повторная операция</option>
              </select>
            </th>
          </tr>
          <tr>
            <th>Тип катетера</th>
            <th>
              <select v-model="catheter_new">
                <catheter />
              </select>
            </th>
          </tr>
          <tr>
            <th>Количество точек абляции</th>
            <th>
              <input type="number" v-model="number_of_ablation_points_new" />
            </th>
          </tr>
          <tr>
            <th>Места абляции</th>
            <th>
              <div>
                <div
                  v-for="(site, index) in sites_name"
                  :key="'new-' + index"
                  class="ablation-edit"
                >
                  <input v-model="sites_name[index]" placeholder="Название" />
                  <button @click="removeNewSite(index)" class="remove-button">
                    ×
                  </button>
                </div>

                <div class="ablation-edit">
                  <input
                    v-model="newAblationSite"
                    placeholder="Введите новое место"
                    @keyup.enter="add_ablation_site"
                  />
                  <button @click="add_ablation_site" class="add-button">
                    Добавить
                  </button>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea v-model.lazy.trim="note_new" />
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
import Catheter from "./Сatheter.vue";

export default {
  props: {
    catheter_new: { type: Number },
    name_new: { type: String },
    date_new: { type: String },
    type_stage_new: { type: String },
    ablation_sites_new: { type: Number },
    number_of_ablation_points_new: { type: Object },
    note_new: { type: Number },
  },
  components: { Catheter },
  data() {
    return {
      newAblationSite: "",
      sites_name: [],
      catheter_new: this.catheter,
      name_new: this.name,
      date_new: this.date,
      type_stage_new: this.type_stage,
      ablation_sites_new: { ...this.ablation_sites },
      number_of_ablation_points_new: this.number_of_ablation_points,
      note_new: this.note,
    };
  },
  methods: {
    add_ablation_site() {
      if (!this.newAblationSite.trim()) return;
      this.sites_name.push(this.newAblationSite.trim());
      this.newAblationSite = "";
    },
    removeNewSite(index) {
      this.sites_name.splice(index, 1);
    },
    onSave() {
      console.log(
        "Данные перед отправкой в AddSurgicalOperation (добавить операцию):",
        {
          catheter_new: this.catheter_new,
          name_new: this.name_new,
          date_new: this.date_new,
          type_stage_new: this.type_stage_new,
          number_of_ablation_points_new: this.number_of_ablation_points_new,
          note_new: this.note_new,
          sites_name: this.sites_name,
        }
      );
      this.$emit(
        "add_item",
        this.catheter_new,
        this.name_new,
        this.date_new,
        this.type_stage_new,
        this.number_of_ablation_points_new,
        this.note_new,
        this.sites_name
      );
      this.onCancel();
    },
    onCancel() {
      this.sites_name = [];
      this.$emit("cancel_item");
    },
  },
};
</script>


<style scoped>
.form-operation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  border-radius: 8px 8px 8px 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.322);
}
</style>