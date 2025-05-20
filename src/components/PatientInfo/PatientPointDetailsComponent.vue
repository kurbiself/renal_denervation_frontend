<template>
  <form>
    <div v-if="!edit_mode">
      <table>
        <tbody>
          <tr>
            <th>Тип</th>
            <th>
              {{ item.type_point_name }}
            </th>
          </tr>
          <tr>
            <th>Дата поступления</th>
            <th>
              {{ formatDate(item.date_of_receipt) }}
            </th>
          </tr>
          <tr>
            <th>Дата выписки</th>
            <th>
              {{ formatDate(item.date_of_discharge) }}
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="update" type="button" title="Изменить" @click="onEdit">
          Изменить
        </button>
        <button class="delete" type="button" title="Удалить" @click="onDelete">
          Удалить
        </button>
      </div>
    </div>
    <patient-point-edit
      v-else
      :date_of_receipt="this.item.date_of_receipt"
      :date_of_discharge="this.item.date_of_discharge"
      :type_point="this.item.type_point"
      @edit_item="edit_item"
      @cancel_item="cancel_item"
    />
  </form>
</template>

<script>
import VariantsTypeCheckPoint from "./VariantsTypeCheckPoint.vue";
import PatientPointEdit from "./PatientPointEdit.vue";
import { format } from "date-fns";
export default {
  components: {
    VariantsTypeCheckPoint,
    PatientPointEdit,
  },
  props: {
    item: { type: Object },
  },
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "Нет данных";
      try {
        return format(new Date(date), "dd.MM.yyyy");
      } catch (e) {
        console.error("Ошибка форматирования даты:", e);
        return date;
      }
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
    edit_item(date_of_receipt, date_of_discharge, type_point) {
      this.$emit("edit_item", date_of_receipt, date_of_discharge, type_point);
      this.edit_mode = false;
    },
    cancel_item() {
      this.edit_mode = false;
    },
  },
};
</script>

<style>
.delete,
.update {
  padding: 8px 16px;
  font-size: 15px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 10px;
  
}
.delete {
  background: #932121;
  margin-left: 10px;
}
.update {
  background: #1797b1;
}
.update:hover,
.delete:hover {
  filter: brightness(1.1);
}
</style>
