<template>
  <form class="form-classic" @submit.prevent>
    <div>
      <h1>Список единиц измерения</h1>
      <div class="div-for-table-design">
        <button class="add" @click="showAddDisease = true">+</button>
        <div v-if="showAddDisease" class="modal-add">
          <div class="modal-overlay">
            <add-units
              @cancel="showAddDisease = false"
              @add_units="add_units"
            ></add-units>
          </div>
        </div>
        <table class="table_design">
          <thead>
            <tr>
              <th>Полное наименование</th>
              <th>Краткое наименование</th>
            </tr>
          </thead>
          <tbody>
            <units-component
              v-for="item in items"
              :id="item.id"
              :fullname="item.fullname"
              :shortname="item.shortname"
              @edit_units="edit_units"
              @delete_units="delete_units"
            />
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>

<script>
import UnitsComponent from "./UnitsComponent.vue";
import AddUnits from "./AddUnits.vue";
export default {
  components: {
    UnitsComponent,
    AddUnits,
  },
  data() {
    return {
      items: [],
      showAddDisease: false,
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("units/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addUnits(fullname, shortname) {
      console.log("Данные перед отправкой about:", {
        fullname: fullname,
        shortname: shortname,
      });
      try {
        await this.$http.post(
          "units/",
          {
            fullname: fullname,
            shortname: shortname,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editUnits(id, fullname, shortname) {
      console.log("Данные перед отправкой about:", {
        id: id,
        fullname: fullname,
        shortname: shortname,
      });
      try {
        await this.$http.put(
          "units/" + id + "/",
          {
            fullname: fullname,
            shortname: shortname,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUnits(id) {
      try {
        await this.$http.delete("units/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    add_units(fullname, shortname) {
      this.addUnits(fullname, shortname);
      this.getData();
      this.refresh();
      this.showAddDisease = false;
    },
    edit_units(id, fullname, shortname) {
      this.editUnits(id, fullname, shortname);
      this.getData();
      this.refresh();
    },
    delete_units(id) {
      this.deleteUnits(id);
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
