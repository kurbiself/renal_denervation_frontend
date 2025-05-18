<template>
  <div>
    <h1>Список пациентов</h1>
    <div class="div-for-table-design">
      <button class="add" @click="addPatient">+</button>
      <table class="table_design">
        <thead>
          <tr>
            <th>код</th>
            <th>пол</th>
            <th>дата рождения</th>
          </tr>
        </thead>
        <tbody>
          <patients-component
            v-for="item in items"
            :id="item.id"
            :code="item.code"
            :birth="item.birth"
            :gender="item.gender"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PatientsComponent from "./PatientsComponent.vue";
export default {
  components: {
    PatientsComponent,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("patient/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addPatient() {
      this.$router.push({
        name: "newpatient",
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
