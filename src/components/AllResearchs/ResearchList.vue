<template>
  <div>
    <h1>Список исследований</h1>
    <div class="div-for-table-design">
      <table class="table_design">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Контрольная точка</th>
            <th>Дата</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          <research-list-component
            v-for="item in items"
            :id="item.id"
            :research_template_name="item.research_template_name"
            :check_point_id="item.check_point_id"
            :check_point_name="item.check_point_name"
            :date="item.date"
            :note="item.note"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ResearchListComponent from "./ResearchListComponent.vue";
export default {
  components: { ResearchListComponent },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "researchs/"
        );
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
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
