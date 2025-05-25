<template>
  <option
    v-for="item in items"
    :key="item.id"
    :value="item.id"
  >
    {{ item.shortname }}
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
      const response = await this.$http.get("hospitals/");
      this.items = response.data;
      this.$emit('loaded');
    } catch (error) {
      console.error("Ошибка загрузки шаблонов:", error);
    }
  }
};
</script>