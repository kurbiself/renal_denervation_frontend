<template>
  <h1>Лекарственные вещества</h1>
  <div class="div-for-table-design">
    <button class="add" @click="add_drugs">+</button>
    <table class="table_design">
      <thead>
        <tr>
          <th>Торговое название</th>
          <th>Международное непатентованное название</th>
          <th>Активное вещество</th>
          <th>Фармакологическая группа</th>
        </tr>
      </thead>
      <tbody>
        <drugs-component
          v-for="item in items"
          :id="item.id"
          :trade_name="item.trade_name"
          :international_name="item.international_name"
          :active_ingredient="item.active_ingredient"
          :active_ingredient_name="item.active_ingredient_name"
          :pharmacological_group_id="item.pharmacological_group_id"
          :pharmacological_group_name="item.pharmacological_group_name"
          @edit_drugs="edit_drugs"
          @delete_drugs="delete_drugs"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import DrugsComponent from "./DrugsComponent.vue";
import AddDrugs from "./AddDrugs.vue";
export default {
  components: { DrugsComponent, AddDrugs },
  data() {
    return {
      items: [],
      showAddDisease: false,
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("medicines/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editDrug(id, trade_name, international_name, active_ingredient) {
      console.log("Данные перед отправкой в Drugs:", {
        id: id,
        trade_name: trade_name,
        international_name: international_name,
        active_ingredient: active_ingredient,
      });

      try {
        await this.$http.put(
          "medicines/" + id + "/",
          {
            trade_name: trade_name,
            international_name: international_name,
            active_ingredient: active_ingredient,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDrug(id) {
      console.log("Данные перед отправкой DELETE:", id);
      try {
        await this.$http.delete("medicines/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },

    edit_drugs(id, trade_name, international_name, active_ingredient) {
      this.editDrug(id, trade_name, international_name, active_ingredient);
      this.getData();
      this.refresh();
    },
    delete_drugs(id) {
      this.deleteDrug(id);
      this.getData();
      this.refresh();
    },
    add_drugs(trade_name, international_name, active_ingredient) {
      this.$router.push({
        name: "newdrug",
      });

      this.addDrug(trade_name, international_name, active_ingredient);
      this.showAddDisease = false;
      this.getData();
      this.refresh();
    },
    refresh() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
  },

  created() {
    this.getData();
  },
};
</script>
