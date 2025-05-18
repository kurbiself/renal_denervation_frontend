<template>
  <tr>
    <td>
      <RouterLink
        :to="{ name: 'researchtemplatedetail', params: { id: this.id } }"
      >
        {{ name }}
      </RouterLink>
    </td>
    <td>{{ type_research }}</td>
    <td>{{ obligation_of_research }}</td>
    <td>{{ note }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type_research: {
      type: String,
    },
    obligation_of_research: {
      type: String,
    },
    note: {
      type: String,
    },
  },
};
</script>

<style></style>
