<template>
  <div v-if="!edit_mode">
    <div class="info-row">
      <span class="info-label">Код пациента: </span>
      <span class="info-value">{{ code }}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Дата рождения:</span>
      <span class="info-value">{{ displayBirthDate }}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Пол: </span>
      <span class="info-value">{{ gender }}</span>
    </div>
    <button class="add" type="button" title="Изменить" @click="onEdit">
      Изменить
    </button>
  </div>
  <about-patient-edit
    v-else
    :code="this.code"
    :gender="this.gender"
    :birth="this.birth"
    @edit_item="edit_item"
    @cancel_item="cancel_item"
  />
</template>

<script>
import AboutPatientEdit from "./AboutPatientEdit.vue";
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    birth: {
      type: String,
    },
  },
  components: {
    AboutPatientEdit,
  },
  computed: {
    displayBirthDate() {
      if (!this.birth) return "Не указана";
      const options = { day: "numeric", month: "numeric", year: "numeric" }; //можно указать long
      return new Date(this.birth).toLocaleDateString("ru-RU", options);
    },
  },
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/patientslist/");
    },
    onEdit() {
      this.edit_mode = true;
    },
    onDelete() {
      if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        //будет всплывающее окно
        this.$emit("delete_item");
        this.goBack();
      }
    },
    edit_item(code, gender, birth) {
      this.$emit("edit_item", code, gender, birth);
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>

<style>
.info-row {
  display: flex;
  align-items: center;
}

.info-label {
  font-weight: 600;
  color: #071e24;
  width: 120px;
}
.info-value {
  padding: 10px 18px;
}
</style>
