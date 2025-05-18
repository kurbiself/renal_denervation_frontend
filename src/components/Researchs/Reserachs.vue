<template>
  <tr>
    <td>
      {{ research.id}}
    </td>
    <td>
      <router-link
        :to="{
          name: 'aboutresearch',
          params: { research_id: research.id },
          query: {
            id_point: id_point,
            research_name: research.research_template_name,
          },
        }"
        >{{ research.research_template_name }}</router-link
      >
    </td>
    <td>{{ research.date }}</td>
    <td>{{ research.note }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    research: { type: Object },
    id_point: {
      type: Number,
    },
  },
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    edit_item(date_of_receipt, date_of_discharge, type_point) {
      this.$emit("edit_item", date_of_receipt, date_of_discharge, type_point);
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>
