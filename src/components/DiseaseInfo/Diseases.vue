<template>
  <form class="form-classic" @submit.prevent>
    <div>
      <h1>Список заболеваний</h1>
      <div class="div-for-table-design">
        <button class="add" @click="showAddDisease = true">+</button>
        <div v-if="showAddDisease" class="modal-add">
          <div class="modal-overlay">
            <add-disease
              @cancel="showAddDisease = false"
              @add_diseases="add_diseases"
            ></add-disease>
          </div>
        </div>
        <table class="table_design">
          <thead>
            <tr>
              <th>Полное наименование</th>
              <th>Краткое наименование</th>
              <th>Код МКБ 10</th>
              <th>Примечание</th>
            </tr>
          </thead>
          <tbody>
            <diseases-component
              v-for="item in items"
              :id="item.id"
              :fullname="item.fullname"
              :shortname="item.shortname"
              :code_ICD_10="item.code_ICD_10"
              :note="item.note"
              @edit_diseases="edit_diseases"
              @delete_diseases="delete_diseases"
            />
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>

<script>
import DiseasesComponent from "./DiseasesComponent.vue";
import AddDisease from "./AddDisease.vue";
export default {
  components: {
    DiseasesComponent,
    AddDisease,
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
        const response = await this.$http.get("diseases/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addDisease(fullname, shortname, code_ICD_10, note) {
      console.log("Данные перед отправкой about:", {
        fullname: fullname,
        shortname: shortname,
        code_ICD_10: code_ICD_10,
        note: note,
      });
      try {
        await this.$http.post(
          "diseases/",
          {
            fullname: fullname,
            shortname: shortname,
            code_ICD_10: code_ICD_10,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editDiseases(id, fullname, shortname, code_ICD_10, note) {
      console.log("Данные перед отправкой about:", {
        id: id,
        fullname: fullname,
        shortname: shortname,
        code_ICD_10: code_ICD_10,
        note: note,
      });
      try {
        await this.$http.put(
          "diseases/" + id + "/",
          {
            id: id,
            fullname: fullname,
            shortname: shortname,
            code_ICD_10: code_ICD_10,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDiseases(id) {
      try {
        await this.$http.delete("diseases/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    add_diseases(fullname, shortname, code_ICD_10, note) {
      this.addDisease(fullname, shortname, code_ICD_10, note);
      this.getData();
      this.refresh();
      this.showAddDisease = false;
    },
    edit_diseases(id, fullname, shortname, code_ICD_10, note) {
      this.editDiseases(id, fullname, shortname, code_ICD_10, note);
      this.getData();
      this.refresh();
    },
    delete_diseases(id) {
      this.deleteDiseases(id);
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
