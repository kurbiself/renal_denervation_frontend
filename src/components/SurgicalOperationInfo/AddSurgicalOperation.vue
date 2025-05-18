<template>
  <h1>Добавление оперативного вмешательсва для {{ point_id }}</h1>
  <add-surgical-operation-component
    @add_item="add_item"
    @cancel_item="cancel_item"
  />
</template>

<script>
import AddSurgicalOperationComponent from "./AddSurgicalOperationComponent.vue";
export default {
  components: { AddSurgicalOperationComponent },
  props: {
    point_id: { type: Number },
  },
  data() {
    return { id_surgical_operation: null };
  },
  methods: {
    async addData(
      catheter_new,
      name_new,
      date_new,
      type_stage_new,
      number_of_ablation_points_new,
      note_new
    ) {
      console.log("Данные перед отправкой для добавления операции:", {
        catheter_new,
        name_new,
        date_new,
        type_stage_new,
        number_of_ablation_points_new,
        note_new,
      });
      try {
        const response = await this.$http.post(
          "surgical-operations/",
          {
            check_point_id: this.point_id,
            catheter: catheter_new,
            name: name_new,
            date: date_new,
            type_stage: type_stage_new,
            number_of_ablation_points: number_of_ablation_points_new,
            note: note_new,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
        this.id_surgical_operation = response.data.id;
      } catch (error) {
        console.log(error);
      }
    },
    async addAblationSite(name) {
      try {
        console.log(this.id_surgical_operation, name)
        const response = await this.$http.post(
          "ablation-sites/",
          { surgical_operation: this.id_surgical_operation, name: name },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
        this.ablation_sites_new[response.data.id] = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async add_item(
      catheter_new,
      name_new,
      date_new,
      type_stage_new,
      number_of_ablation_points_new,
      note_new,
      sites_name
    ) {
      await this.addData(
        catheter_new,
        name_new,
        date_new,
        type_stage_new,
        number_of_ablation_points_new,
        note_new
      );
      await this.add_site_names(sites_name);
      this.cancel_item();
    },
    async add_site_names(sites_name) {
      await Promise.all(sites_name.map((site) => this.addAblationSite(site)));
    },
    cancel_item() {
      this.$router.push(`/pointdetails/${this.point_id}`);
    },
  },
};
</script>
