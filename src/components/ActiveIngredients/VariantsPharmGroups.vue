<template>
  <option
    v-for="item in items"
    :key="item.id"
    :value="item.id"
  >
    {{ item.name }}
  </option>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async created() {
    try {
      const response = await this.$http.get("pharmacological-groups/");
      this.items = response.data;
      this.$emit('loaded');
    } catch (error) {
      console.error("Ошибка загрузки шаблонов:", error);
    }
  }
};
</script>