<template>
  <h1>Добавление новой контрольной точки</h1>
  <add-new-point-component @add_item="add_item" @cancel_item="cancel_item"/>
</template>

<script>
import AddNewPointComponent from "./AddNewPointComponent.vue";
export default {
  components: { AddNewPointComponent },
  props: {
    patient_id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async addData(
      date_of_receipt,
      date_of_discharge,
      type_point,
      hospital_id,
      note
    ) {
      console.log("Данные перед отправкой:", {
        date_of_receipt,
        date_of_discharge,
        type_point,
        hospital_id,
        note,
      });
      try {
        await this.$http.post(
          "check-points/",
          {
            patient: this.patient_id,
            type_point: type_point,
            date_of_discharge: date_of_discharge,
            date_of_receipt: date_of_receipt,
            hospital_id: hospital_id,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    add_item(
      date_of_receipt,
      date_of_discharge,
      type_point,
      hospital_id,
      note
    ) {
      this.addData(
        date_of_receipt,
        date_of_discharge,
        type_point,
        hospital_id,
        note
      );
    },
    cancel_item(){
      this.$router.push("/patientslist/"+this.patient_id);
    },
  },
};
</script>
