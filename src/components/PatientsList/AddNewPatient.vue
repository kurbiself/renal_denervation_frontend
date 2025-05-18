<template>
  <h1>Добавление нового пациента</h1>
  <add-new-patient-component @add_item="add_item" @cancel_item="cancel_item" />
</template>

<script>
import AddNewPatientComponent from "./AddNewPatientComponent.vue";
export default {
  components: { AddNewPatientComponent },
  methods: {
    async addData(code, gender, birth) {
      console.log("Данные перед отправкой:", {
        code,
        gender,
        birth,
      });
      try {
        await this.$http.post(
          "patient/",
          {
            code: code,
            gender: gender,
            birth: birth,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    add_item(code, gender, birth) {
      this.addData(code, gender, birth);
      this.cancel_item()
    },
    cancel_item() {
      this.$router.push(/pointdetails/);
    },
  },
};
</script>
