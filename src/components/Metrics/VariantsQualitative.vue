<template>
  <option
    v-for="item in items"
    :key="item.id"
    :value="item.id"
    :selected="selected_id === item.id"
  >
    {{ item.value }}
  </option>
</template>

<script>
export default {
  props: {
    metric_id: {
      type: Number,
      required: true
    },
    selected_id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          `variants-qualitative/?metric_id=${this.metric_id}`
        );
        this.items = response.data;
      } catch (error) {
        console.error("Ошибка загрузки вариантов:", error);
        this.items = [];
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>