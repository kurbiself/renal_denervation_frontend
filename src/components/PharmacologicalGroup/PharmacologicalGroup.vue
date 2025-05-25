<template>
  <form class="form-classic" @submit.prevent>
    <h1>Фармакологическая группа</h1>
    <div class="div-for-table-design">
      <button class="add" @click="showAddDisease = true">+</button>
      <div v-if="showAddDisease">
        <div>
          <add-pharmacological-group
            @cancel="showAddDisease = false"
            @add_new_pharm_group="add_new_pharm_group"
          ></add-pharmacological-group>
        </div>
      </div>
      <table class="table_design">
        <thead>
          <tr>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          <pharmacological-group-component
            v-for="item in items"
            :id="item.id"
            :name="item.name"
            @edit_pharm_group="edit_pharm_group"
            @delete_pharm_group="delete_pharm_group"
          />
        </tbody>
      </table>
    </div>
  </form>
</template>

<script>
import PharmacologicalGroupComponent from './PharmacologicalGroupComponent.vue';
import AddPharmacologicalGroup from './AddPharmacologicalGroup.vue';
export default {
  components: { PharmacologicalGroupComponent, AddPharmacologicalGroup },
  data() {
    return {
      items: [],
      showAddDisease: false,
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("pharmacological-groups/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editPharmacologicalGroup(id, name) {
      console.log("Данные перед отправкой editActiveIngredient :", {
        id: id,
        name: name,
      });

      try {
        await this.$http.put(
          "pharmacological-groups/" + id + "/",
          {
            name: name,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async addPharmacologicalGroup(name) {
      console.log("Данные перед отправкой addPharmacologicalGroup:", {
        name: name,
      });

      try {
        await this.$http.post(
          "pharmacological-groups/",
          {
            name: name,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deletePharmacologicalGroup(id) {
      console.log("Данные перед отправкой DELETE:", id);
      try {
        await this.$http.delete("pharmacological-groups/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },

    edit_pharm_group(id, name) {
      this.editPharmacologicalGroup(id, name);
      this.getData();
      this.refresh();
    },
    delete_pharm_group(id) {
      this.deletePharmacologicalGroup(id);
      this.getData();
      this.refresh();
    },
    add_new_pharm_group(name) {
      this.addPharmacologicalGroup(name);
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
