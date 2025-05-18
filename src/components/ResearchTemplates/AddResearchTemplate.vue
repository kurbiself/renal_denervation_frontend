<template>
  <h1>Добавление нового шаблона исследования</h1>
  <div v-if="!next_add">
    <add-research-template-component
      @add_item="add_item"
      @cancel_item="cancel_item"
    />
  </div>
  <add-metrics v-else />
</template>

<script>
import AddResearchTemplateComponent from "./AddResearchTemplateComponent.vue";

export default {
  components: { AddResearchTemplateComponent },
  data() {
    return {
      next_add: false,
    };
  },
  methods: {
    onNext() {
      this.next_add = true;
    },
    async addData(name, type_research, obligation_of_research, note) {
      console.log("Данные перед отправкой в главном:", {
        name,
        type_research,
        obligation_of_research,
        note,
      });
      try {
        await this.$http.post(
          "research-templates/",
          {
            name: name,
            type_research: type_research,
            obligation_of_research: obligation_of_research,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    add_item(name, type_research, obligation_of_research, note) {
      this.addData(name, type_research, obligation_of_research, note);
      this.next_add = true;
    },
    cancel_item() {
      this.$router.push("/researchtemplates/");
    },
  },
};
</script>

