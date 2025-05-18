<template>
  <option
    v-for="item in items"
    :value="item.id"
    :selected="isSelected(item.id)"
  >
    {{ item.value }}
  </option>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Array,
      default: null,
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
        const response = await this.$http.get(this.name + "/");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    isSelected(id) {
        return this.selected.includes(id);
    },
  },
  created() {
    this.getData();
  },
};
</script>
