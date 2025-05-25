<template>
  <div class="about_patient">
    <form>
      <h1>О пациенте {{ items_patient.code }}</h1>
      <div class="container">
        <div class="patient-info">
          <about-patient-component
            :code="items_patient.code"
            :birth="items_patient.birth"
            :gender="items_patient.gender"
            @edit_item="edit_item"
          />
        </div>
        <div class="disease-info">
          <button type="button" class="add" @click="showAddDisease = true">
            +
          </button>
          <patient-disease-add
            v-if="showAddDisease"
            @cancel="showAddDisease = false"
            @add_diseases="add_diseases"
          >
          </patient-disease-add>

          <table class="strict-table">
            <thead>
              <tr>
                <th>Заболевание</th>
                <th>Начало заболевания</th>
                <th>Значимость</th>
                <th>Примечание</th>
              </tr>
            </thead>
            <tbody>
              <patients-diseases-component
                v-for="d in items_patient.patient_diseases"
                :id="d.id"
                :disease="d.disease_id"
                :disease_name="d.disease_id_shortname"
                :year_start="d.year_start_disease"
                :type_disease="d.classification_disease"
                :note="d.note"
                @edit_diseases="edit_diseases"
                @delete_diseases="delete_diseases"
              />
            </tbody>
          </table>
        </div>
      </div>
      <div class="div-for-table-design">
        <button class="add" @click="addPoint" :patient_id="items_patient.id">
          +
        </button>
        <table class="table_design">
          <thead>
            <tr>
              <th>Контрольная точка</th>
              <th>Дата поступления</th>
              <th>Дата выписки</th>
            </tr>
          </thead>
          <tbody>
            <patient-with-points-component
              v-for="item in items_patient.points"
              :id="item.id"
              :type_point="item.type_point"
              :type_point_name="item.type_point_name"
              :date_of_receipt="item.date_of_receipt"
              :date_of_discharge="item.date_of_discharge"
            />
          </tbody>
        </table>
      </div>
      <div class="footer-buttons">
        <button @click="goBack">Вернуться к списку</button>
        <button
          type="button"
          class="delete_item"
          @click.self="showModal = true"
        >
          Удалить пациента
        </button>
      </div>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>Подтверждение удаления</h3>
          <p>
            Вы уверены, что хотите удалить пациента "{{ items_patient.code }}"?
          </p>
          <div class="modal-actions">
            <button
              @click="deletePatient"
              :disabled="loading"
              class="delete-btn"
            >
              {{ loading ? "Удаление..." : "Да, удалить" }}
            </button>
            <button @click="closeModal" :disabled="loading" class="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AboutPatientComponent from "./AboutPatientComponent.vue";
import PatientWithPointsComponent from "./PatientWithPointsComponent.vue";
import PatientsDiseasesComponent from "./PatientsDiseasesComponent.vue";
import PatientDiseaseAdd from "./PatientDiseaseAdd.vue";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    AboutPatientComponent,
    PatientWithPointsComponent,
    PatientsDiseasesComponent,
    PatientDiseaseAdd,
  },
  data() {
    return {
      items_patient: [],
      showModal: false,
      loading: false,
      preventUpdates: false,
      showAddDisease: false,
    };
  },
  methods: {
    async getData() {
      if (this.preventUpdates) return;
      try {
        this.items_patient = (
          await this.$http.get("patient/" + this.id + "/")
        ).data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        await this.$http.delete("patient/" + this.id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editData(code, gender, birth) {
      console.log("Данные перед отправкой:", {
        code,
        birth,
        gender,
      });
      try {
        await this.$http.put(
          "patient/" + this.id + "/",
          {
            id: this.id,
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
    async addPatientDiseases(disease, year_start, type_disease, note) {
      console.log("Данные перед отправкой about:", {
        patient_id: this.items_patient.id,
        disease_id: disease,
        year_start_disease: year_start,
        classification_disease: type_disease,
        note: note,
      });
      try {
        await this.$http.post(
          "patient-diseases/",
          {
            patient_id: this.items_patient.id,
            disease_id: disease,
            year_start_disease: year_start,
            classification_disease: type_disease,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editPatientDiseases(id, disease, year_start, type_disease, note) {
      try {
        console.log("Данные перед отправкой:", {
          patient_id: this.items_patient.id,
          disease_id: disease,
          year_start_disease: year_start,
          classification_disease: type_disease,
        });
        await this.$http.put(
          "patient-diseases/" + id + "/",
          {
            patient_id: this.items_patient.id,
            disease_id: disease,
            year_start_disease: year_start,
            classification_disease: type_disease,
            note: note,
          },
          { headers: { authorization: `Bearer ${localStorage.access_token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deletePatientDiseases(id) {
      try {
        await this.$http.delete("patient-diseases/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.push("/patientslist");
    },
    addPoint() {
      this.$router.push({
        name: "newpoint",
        params: { patient_id: this.items_patient.id },
      });
    },
    add_diseases(disease, year_start, type_disease, note) {
      this.addPatientDiseases(disease, year_start, type_disease, note);
      this.getData();
      this.refresh();
      this.showAddDisease = false;
    },
    edit_item(code, birth, gender) {
      this.editData(code, birth, gender);
      this.getData();
      this.refresh();
    },
    edit_diseases(id, disease, year_start, type_disease, note) {
      this.editPatientDiseases(id, disease, year_start, type_disease, note);
      this.getData();
      this.refresh();
    },
    delete_item() {
      this.deleteData();
      this.goBack();
    },
    delete_diseases(id) {
      this.deletePatientDiseases(id);
      this.getData();
      this.refresh();
    },
    refresh() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
    //Для модального окна
    async deletePatient() {
      this.loading = true;
      this.preventUpdates = true;
      try {
        await this.$http.delete(`patient/${this.id}/`, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.showModal = false;
        this.$router.push("/patientslist");
      } catch (error) {
        console.error("Ошибка удаления:", error);
        alert("Не удалось удалить пациента");
      } finally {
        this.loading = false;
        this.preventUpdates = false; // Разблокируем обновления
      }
    },
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
      }
    },
  },
  created() {
    this.getData();
  },
  watch: {
    showModal(val) {
      console.log("Modal state changed to:", val);
    },
    id() {
      // Закрываем модалку при изменении ID пациента
      if (this.showModal) {
        this.showModal = false;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
}

.patient-info,
.disease-info {
  margin: 2px;
  border-radius: 8px 8px 8px 8px;
  padding: 10px;
}
.patient-info {
  flex: 1;
}
.disease-info {
  flex: 2;
}
.about_patient {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;

  h1 {
    color: #003333;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
  }
  .add {
    text-align: center;
    font-size: 18px;
    background-color: #1797b1;
    border: 8px solid #1797b1;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    justify-content: space-around;
  }
  .add:hover {
    background-color: #29b4d0;
    border-color: #29b4d0;
  }
  form {
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 0px 10px #171b4890;
  }
}
</style>
