<template>
  <form class="form-classic" @submit.prevent>
    <h1>Активные вещества</h1>
    <div class="div-for-table-design">
      <button class="add" @click="showAddDisease = true">+</button>
      <div v-if="showAddDisease">
        <div>
          <add-active-ingredient
            @cancel="showAddDisease = false"
            @add_new_ingredient="add_new_ingredient"
          ></add-active-ingredient>
        </div>
      </div>
      <table class="table_design">
        <thead>
          <tr>
            <th>Название</th>
            <th>Фармакологическая группа</th>
          </tr>
        </thead>
        <tbody>
          <active-ingredient-component
            v-for="item in items"
            :id="item.id"
            :name="item.name"
            :pharmacological_group_id="item.pharmacological_group"
            :pharmacological_group_name="item.pharmacological_group_name"
            @edit_ingredient="edit_ingredient"
            @delete_ingredient="delete_ingredient"
          />
        </tbody>
      </table>
    </div>
  </form>
</template>

<script>
import ActiveIngredientComponent from "./ActiveIngredientComponent.vue";
import AddActiveIngredient from "./AddActiveIngredient.vue";
export default {
  components: { ActiveIngredientComponent, AddActiveIngredient },
  data() {
    return {
      items: [],
      showAddDisease: false,
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("active-ingredients/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editActiveIngredient(id, name, pharmacological_group) {
      console.log("Данные перед отправкой editActiveIngredient :", {
        id: id,
        name: name,
        pharmacological_group: pharmacological_group,
      });

      try {
        await this.$http.put(
          "active-ingredients/" + id + "/",
          {
            name: name,
            pharmacological_group: pharmacological_group,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async addActiveIngredient(name, pharmacological_group) {
      console.log("Данные перед отправкой addActiveIngredient:", {
        name: name,
        pharmacological_group: pharmacological_group,
      });

      try {
        await this.$http.post(
          "active-ingredients/",
          {
            name: name,
            pharmacological_group: pharmacological_group,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteActiveIngredient(id) {
      console.log("Данные перед отправкой DELETE:", id);
      try {
        await this.$http.delete("active-ingredients/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },

    edit_ingredient(id, name, pharmacological_group) {
      this.editActiveIngredient(id, name, pharmacological_group);
      this.getData();
      this.refresh();
    },
    delete_ingredient(id) {
      this.deleteActiveIngredient(id);
      this.getData();
      this.refresh();
    },
    add_new_ingredient(name, pharmacological_group) {
      this.addActiveIngredient(name, pharmacological_group);
      this.getData();
      this.refresh();
      this.showAddDisease = false;
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
