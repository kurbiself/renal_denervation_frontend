<template>
  <h1>Добавление нового лекарства</h1>
  <add-drugs-component @add_item="add_item" @cancel_item="cancel_item"></add-drugs-component>
</template>

<script>
import AddDrugsComponent from "./AddDrugsComponent.vue";
export default {
  components: { AddDrugsComponent },
  methods: {
    async addDrug(trade_name, international_name, active_ingredient) {
      console.log("Данные перед отправкой в Drugs:", {
        trade_name: trade_name,
        international_name: international_name,
        active_ingredient: active_ingredient,
      });

      try {
        await this.$http.post(
          "medicines/",
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
    add_item(trade_name, international_name, active_ingredient) {
      this.addDrug(trade_name, international_name, active_ingredient);
    },
    cancel_item() {
      this.$router.push("/drugslist");
    },
  },
};
</script>
