<template>
  <option
    v-for="item in items"
    :key="item.metric_id"
    :value="item.metric_id"
  >
    {{ item.metric_data.fullname }}
  </option>
</template>

<script>
export default {
  props: {
    research_template_id: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        console.log(
          "Variants:",
          this.research_template_id
        );
        const response = await this.$http.get(
          `metrics-templates/?research_template_id=${this.research_template_id}`
        );
        this.items = response.data;
        console.log(
          "Items:",
          this.items
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
