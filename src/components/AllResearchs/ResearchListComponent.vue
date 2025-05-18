<template>
  <tr>
    <td>
      <RouterLink
        :to="{
          name: 'aboutresearch',
          params: { research_id: this.id },
          query: {
            id_point: this.check_point_id,
            research_name: this.research_template_name,
          },
        }"
      >
        {{ research_template_name }}
      </RouterLink>
    </td>
    <td>
      <RouterLink
        :to="{
          name: 'pointdetails',
          params: { id: this.check_point_id },
        }"
        >{{ check_point_name }}</RouterLink
      >
    </td>
    <td>{{ date }}</td>
    <td>{{ note }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    id: { type: Number },
    research_template_name: { type: String },
    check_point_id: { type: Number },
    check_point_name: { type: String },
    date: { type: String },
    note: { type: String },
  },
  methods: {},
};
</script>
