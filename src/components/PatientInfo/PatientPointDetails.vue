<template>
  <h1>Информация о выбранной контрольной точке</h1>
  <form class="form-classic" @submit.prevent>
    <div class="container-for-pointdetails">
      <div class="top-row">
        <div class="point-info">
          <h2>Основное</h2>
          <patient-point-details-component
            :item="item"
            @edit_item="edit_item"
            @delete_item="delete_item"
            @refresh="refresh"
          />
        </div>
        <div class="operation-info">
          <h2>Оперативное вмешательство</h2>
          <div
            class="div-for-table-design"
            v-if="operations && operations?.length"
          >
            <surgical-operation
              v-for="operation in operations"
              :id="operation.id"
              :check_point_id="operation.check_point_id"
              :catheter="operation.catheter"
              :name="operation.name"
              :date="operation.date"
              :type_stage="operation.type_stage"
              :ablation_sites="operation.ablation_sites"
              :number_of_ablation_points="operation.number_of_ablation_points"
              :note="operation.note"
              @edit_surgical_operation="edit_surgical_operation"
              @delete_surgical_operation="delete_surgical_operation"
            />
          </div>
          <div class="div-for-table-design" v-else>
            <button class="add" @click="add_surgical_operation">+</button>
            <h3>Нет данных об операции</h3>
          </div>
        </div>
      </div>
      <div class="drug-therapy">
        <h2>Фармакотерапия</h2>
        <div class="div-for-table-design">
          <button class="add" @click="add_treatment_drug">+</button>
          <table class="table_design">
            <thead>
              <tr>
                <th>Лекарственный препарат</th>
                <th>Доза</th>
                <th>Утро</th>
                <th>День</th>
                <th>Вечер</th>
                <th>Ночь</th>
                <th>Примечание</th>
              </tr>
            </thead>
            <tbody>
              <treatment-drug
                v-for="treatment in treatments_of_drugs"
                :id="treatment.id"
                :check_point_id="treatment.check_point_id"
                :medicine="treatment.medicine"
                :medicine_name="treatment.medicine_name"
                :dose="treatment.dose"
                :taking_medicine_morning="treatment.taking_medicine_morning"
                :taking_medicine_day="treatment.taking_medicine_day"
                :taking_medicine_evening="treatment.taking_medicine_evening"
                :taking_medicine_night="treatment.taking_medicine_night"
                :note="treatment.note"
                @edit_treatment_drug_component="edit_treatment_drug_component"
                @delete_treatment_drug="delete_treatment_drug"
              />
            </tbody>
          </table>
        </div>
      </div>
      <div class="research-info">
        <h2>Исследование</h2>
        <div class="div-for-table-design">
          <button class="add" @click="addResearch">+</button>
          <table class="table_design">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Дата</th>
                <th>Примечание</th>
              </tr>
            </thead>
            <tbody>
              <reserachs
                v-for="research in researhs_list"
                :research="research"
                :id_point="id"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="footer-buttons">
      <button @click="goBack">Назад</button>
    </div>
  </form>
</template>

<script>
import PatientPointDetailsComponent from "./PatientPointDetailsComponent.vue";
import Reserachs from "../Researchs/Reserachs.vue";
import SurgicalOperation from "../SurgicalOperationInfo/SurgicalOperation.vue";
import TreatmentDrug from "../TreatmentDrug/TreatmentDrug.vue";
export default {
  components: {
    PatientPointDetailsComponent,
    Reserachs,
    SurgicalOperation,
    TreatmentDrug,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      item: {},
      researhs_list: {},
      operations: {},
      treatments_of_drugs: {},
    };
  },
  watch: {
    // Следим за изменением query-параметров
    "$route.query"(newQuery) {
      if (newQuery.forceRefresh) {
        this.getData(); // Загружаем данные
        // Убираем параметр из URL (чтобы не срабатывало при ручном F5)
        this.$router.replace({ query: null });
      }
    },
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("check-points/" + this.id + "/");
        this.item = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getResearchs() {
      try {
        const response = await this.$http.get(
          `researchs/?check_point_id=${this.id}`
        );
        this.researhs_list = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getSurgicalOperations() {
      try {
        const response = await this.$http.get(
          `surgical-operations/?check_point_id=${this.id}`
        );
        this.operations = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTreatmentsDrug() {
      try {
        const response = await this.$http.get(
          `treatments-drug/?check_point_id=${this.id}`
        );
        this.treatments_of_drugs = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editData(date_of_receipt, date_of_discharge, type_point) {
      console.log("Point", {
        patient: this.item.patient,
        type_point: type_point,
        date_of_discharge: date_of_discharge,
        date_of_receipt: date_of_receipt,
      });
      try {
        await this.$http.put(
          "check-points/" + this.id + "/",
          {
            patient: this.item.patient,
            type_point: type_point,
            date_of_discharge: date_of_discharge,
            date_of_receipt: date_of_receipt,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async destroyData() {
      try {
        await this.$http.delete("check-points/" + this.id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTreatmentDrug(id) {
      try {
        await this.$http.delete("treatments-drug/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateTreatmentDrug(
      id,
      check_point_id,
      medicine_new,
      dose_new,
      taking_medicine_morning_new,
      taking_medicine_day_new,
      taking_medicine_evening_new,
      taking_medicine_night_new,
      note_new
    ) {
      try {
        await this.$http.put(
          "treatments-drug/" + id + "/",
          {
            check_point_id: check_point_id,
            type_stage: "Фармакотерапия",
            medicine: medicine_new,
            note: note_new,
            dose: dose_new,
            taking_medicine_morning: taking_medicine_morning_new,
            taking_medicine_day: taking_medicine_day_new,
            taking_medicine_evening: taking_medicine_evening_new,
            taking_medicine_night: taking_medicine_night_new,
          },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async updateSurgicalOperations(
      id,
      check_point_id_new,
      catheter_new,
      name_new,
      date_new,
      type_stage_new,
      number_of_ablation_points_new,
      note_new
    ) {
      try {
        const response = await this.$http.put(
          `surgical-operations/${id}/`,
          {
            check_point_id: check_point_id_new,
            catheter: catheter_new,
            name: name_new,
            date: date_new,
            type_stage: type_stage_new,
            number_of_ablation_points: number_of_ablation_points_new,
            note: note_new,
          },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
        this.operations = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSurgicalOperation(id) {
      try {
        const response = await this.$http.delete(`surgical-operations/${id}/`, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.operations = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    edit_item(date_of_receipt_new, date_of_discharge_new, type_point_new) {
      this.editData(date_of_receipt_new, date_of_discharge_new, type_point_new);
      this.getData();
      this.refresh();
    },
    edit_treatment_drug_component(
      id,
      check_point_id,
      medicine_new,
      dose_new,
      taking_medicine_morning_new,
      taking_medicine_day_new,
      taking_medicine_evening_new,
      taking_medicine_night_new,
      note_new
    ) {
      this.updateTreatmentDrug(
        id,
        check_point_id,
        medicine_new,
        dose_new,
        taking_medicine_morning_new,
        taking_medicine_day_new,
        taking_medicine_evening_new,
        taking_medicine_night_new,
        note_new
      );
      this.getData();
      this.refresh();
    },
    edit_surgical_operation(
      id,
      check_point_id_new,
      catheter_new,
      name_new,
      date_new,
      type_stage_new,
      number_of_ablation_points_new,
      note_new
    ) {
      this.updateSurgicalOperations(
        id,
        check_point_id_new,
        catheter_new,
        name_new,
        date_new,
        type_stage_new,
        number_of_ablation_points_new,
        note_new
      );
      this.refresh();
    },
    delete_treatment_drug(id) {
      this.deleteTreatmentDrug(id);
      this.getData();
      this.refresh();
    },
    delete_item() {
      this.destroyData();
      this.goBack();
    },
    delete_surgical_operation(id) {
      this.deleteSurgicalOperation(id);
    },
    addResearch() {
      this.$router.push({
        name: "newresearch",
        params: { point_id: this.id },
      });
    },
    add_treatment_drug() {
      this.$router.push({
        name: "newtreatmentdrug",
        params: { point_id: this.id },
      });
    },
    add_surgical_operation() {
      this.$router.push({
        name: "newsurgicaloperation",
        params: { point_id: this.id },
      });
    },
    goBack() {
      setTimeout(() => {
        this.$router.push("/patientslist/" + this.item.patient);
      }, 500);
    },
    refresh() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
  },
  created() {
    this.getData();
    this.getResearchs();
    this.getSurgicalOperations();
    this.getTreatmentsDrug();
  },
};
</script>

<style>
.container-for-pointdetails {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.top-row {
  display: flex;
  gap: 2px; /* Отступ между блоками в строке */
}
.point-info,
.operation-info,
.drug-therapy,
.research-info {
  margin: 2px;
  border-radius: 8px 8px 8px 8px;
  padding: 10px;
}
.point-info {
  flex: 1;
  flex-grow: 1;
}
.operation-info {
  flex: 2;
  flex-grow: 3;
}
.drug-therapy {
  flex: 3;
  flex-grow: 2;
}
.research-info {
  flex-grow: 1;
}
</style>
