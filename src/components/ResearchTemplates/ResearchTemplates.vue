<template>
  <form class="form-classic" @submit.prevent>
    <div>
      <h1>Шаблоны исследований</h1>
      <div class="div-for-table-design">
        <button class="add" @click="addResearch">+</button>
        <table class="table_design">
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Приоритет</th>
              <th>Примечание</th>
            </tr>
          </thead>
          <tbody>
            <research-templates-component
              v-for="item in items"
              :id="item.id"
              :name="item.name"
              :type_research="item.type_research"
              :obligation_of_research="item.obligation_of_research"
              :note="item.note"
            />
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>

<script>
import ResearchTemplatesComponent from "./ResearchTemplatesComponent.vue";
export default {
  components: {
    ResearchTemplatesComponent,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("research-templates/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addResearch() {
      this.$router.push({
        name: "newresearchtemplate",
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
