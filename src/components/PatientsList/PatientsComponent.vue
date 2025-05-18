<template>
    <tr>
      <td>
        <RouterLink :to="{name: 'patient', params:{id: this.id}}">
            {{ code }}
        </RouterLink>
      </td>
      <td>{{ gender }}</td>
      <td>{{ birth }}</td>
    </tr>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    birth: {
      type: String,
    },
  },
};
</script>

<style></style>
