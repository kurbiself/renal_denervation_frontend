<template>
    <option
      v-for="item in items"
      :value="item.id"
      :selected="isSelected(item.id)"
    >
      {{ item.shortname }}
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
        type: Number,
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
        var id_to_str = "" + id;
        return "" + id == "" + this.selected;
      },
    },
    created() {
      this.getData();
    },
  };
  </script>
  