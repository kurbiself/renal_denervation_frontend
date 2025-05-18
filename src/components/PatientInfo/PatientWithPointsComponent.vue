<template>
  <tr>
    <td>
      <router-link :to="{ name: 'pointdetails', params: { id: this.id } }">{{
        type_point_name
      }}</router-link>
    </td>
    <td>
      {{ date_of_receipt }}
    </td>
    <td>
      {{ date_of_discharge }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    type_point: {
      type: String,
      required: true,
    },
    type_point_name: {
      type: String,
      required: true,
    },
    date_of_receipt: {
      type: String,
    },
    date_of_discharge: {
      type: String,
    },
  },
};
</script>
