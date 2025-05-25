<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'patient', params: { id: this.id } }">
        {{ code }}
      </RouterLink>
    </td>
    <td>{{ gender }}</td>
    <td>{{ displayBirthDate }}</td>
  </tr>
</template>

<script>
export default {
  computed: {
    displayBirthDate() {
      if (!this.birth) return "Не указана";
      const options = { day: "numeric", month: "numeric", year: "numeric" }; //можно указать long
      return new Date(this.birth).toLocaleDateString("ru-RU", options);
    },
  },
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
