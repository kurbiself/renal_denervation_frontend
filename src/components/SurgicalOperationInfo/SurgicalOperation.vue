<template>
  <div>
    <form class="form-operation" id="EditForm" @submit.prevent>
      <div class="footer-buttons">
        <button v-if="editMode" @click="toggleEditMode" class="edit-button">
          Готово
        </button>
        <button v-if="editMode" @click="cancelEdit" class="edit-button">
          Отмена
        </button>
        <button v-if="!editMode" @click="toggleEditMode" class="edit-button">
          Редактировать
        </button>
        <button
          type="button"
          class="delete_item"
          v-if="!editMode"
          @click.self="showModal = true"
        >
          Удалить операцию
        </button>
      </div>
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить {{ this.name }}?</p>
          <div class="modal-actions">
            <button
              @click="delete_surgical_operation"
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

      <table class="operation-table">
        <tbody>
          <tr>
            <th>Название</th>
            <th>
              <input v-model.lazy.trim="name_new" :disabled="!editMode" />
            </th>
          </tr>
          <tr>
            <th>Дата</th>
            <th>
              <input type="date" v-model="date_new" :disabled="!editMode" />
            </th>
          </tr>
          <tr>
            <th>Тип</th>
            <th>
              <select v-model="type_stage_new" :disabled="!editMode">
                <option value="Операция">Операция</option>
                <option value="Повторная операция">Повторная операция</option>
              </select>
            </th>
          </tr>
          <tr>
            <th>Тип катетера</th>
            <th>
              <select v-model="catheter_new" :disabled="!editMode">
                <catheter />
              </select>
            </th>
          </tr>
          <tr>
            <th>Количество точек абляции</th>
            <th>
              <input
                type="number"
                v-model="number_of_ablation_points_new"
                :disabled="!editMode"
              />
            </th>
          </tr>
          <tr>
            <th>Места абляции</th>
            <th>
              <div v-if="editMode">
                <div
                  v-for="site in ablation_sites_new"
                  :key="site.id"
                  class="ablation-edit"
                >
                  <input
                    v-model="site.name"
                    placeholder="Название места абляции"
                  />
                  <button
                    @click="markForRemoval(site.id)"
                    class="remove-button"
                  >
                    ×
                  </button>
                </div>

                <div
                  v-for="(site, index) in sites_name"
                  :key="'new-' + index"
                  class="ablation-edit"
                >
                  <input v-model="sites_name[index]" placeholder="Название" />
                  <button @click="removeNewSite(index)" class="remove-button">
                    ×
                  </button>
                </div>

                <div class="ablation-edit">
                  <input
                    v-model="newAblationSite"
                    placeholder="Введите новое место"
                    @keyup.enter="add_ablation_site"
                  />
                  <button @click="add_ablation_site" class="add-button">
                    Добавить
                  </button>
                </div>
              </div>
              <div v-else>
                <div v-if="hasAblationSites">
                  <span
                    v-for="value in Object.values(ablation_sites_new)"
                    :key="value.id"
                    class="ablation-label"
                  >
                    {{ value.name }}
                  </span>
                </div>
                <div v-else>Нет данных о местах абляции</div>
              </div>
            </th>
          </tr>
          <tr>
            <th>Примечание</th>
            <th>
              <textarea
                class="form-textarea"
                v-model.lazy.trim="note_new"
                :disabled="!editMode"
              />
            </th>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import Catheter from "./Сatheter.vue";

export default {
  props: {
    id: { type: Number },
    check_point_id: { type: Number },
    catheter: { type: Number },
    name: { type: String },
    date: { type: String },
    type_stage: { type: String },
    ablation_sites: { type: Object },
    number_of_ablation_points: { type: Number },
    note: { type: String },
  },
  components: { Catheter },
  data() {
    return {
      editMode: false,
      newAblationSite: "",
      sites_name: [],
      markedForRemoval: [],
      // new_id: this.id,
      // check_point_id_new: this.check_point_id,
      catheter_new: this.catheter,
      name_new: this.name,
      date_new: this.date,
      type_stage_new: this.type_stage,
      ablation_sites_new: this.ablation_sites || [],
      number_of_ablation_points_new: this.number_of_ablation_points,
      note_new: this.note,
      // для модального окна удаления
      showModal: false,
      loading: false,
    };
  },
  computed: {
    hasAblationSites() {
      return Object.keys(this.ablation_sites_new).length > 0;
    },
  },
  methods: {
    async deleteAblationSite(id) {
      try {
        await this.$http.delete("ablation-sites/" + id + "/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addAblationSite(name) {
      try {
        const response = await this.$http.post(
          "ablation-sites/",
          { surgical_operation: this.id, name: name },
          {
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          }
        );
        this.ablation_sites_new[response.data.id] = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    markForRemoval(id) {
      this.markedForRemoval.push(id);
      this.ablation_sites_new = this.ablation_sites_new.filter(
        (site) => site.id !== id
      );
    },

    removeNewSite(index) {
      this.sites_name.splice(index, 1);
    },

    add_ablation_site() {
      if (!this.newAblationSite.trim()) return;
      this.sites_name.push(this.newAblationSite.trim());
      this.newAblationSite = "";
    },

    async toggleEditMode() {
      if (this.editMode) {
        try {
          // Удаляем помеченные элементы
          await Promise.all(
            this.markedForRemoval.map((id) => this.deleteAblationSite(id))
          );

          // Добавляем новые элементы мест абляции
          await Promise.all(
            this.sites_name.map((site) => this.addAblationSite(site))
          );
          console.log("toggleEditMode:", {
            new_id: this.id,
            check_point_id_new: this.check_point_id,
            catheter_new: this.catheter_new,
            name_new: this.name_new,
            date_new: this.date_new,
            type_stage_new: this.type_stage_new,
            number_of_ablation_points_new: this.number_of_ablation_points_new,
            note_new: this.note_new,
          });
          this.$emit(
            "edit_surgical_operation",
            this.id,
            this.check_point_id,
            this.catheter_new,
            this.name_new,
            this.date_new,
            this.type_stage_new,
            this.number_of_ablation_points_new,
            this.note_new
          );

          // Очищаем временные данные
          this.markedForRemoval = [];
          this.sites_name = [];
          this.editMode = false;
        } catch (error) {
          console.error("Ошибка при сохранении:", error);
        }
      } else {
        this.editMode = true;
      }
    },
    delete_surgical_operation() {
      this.$emit("delete_surgical_operation", this.id);
      this.showModal = false;
    },
    closeModal() {
      if (!this.loading) {
        this.showModal = false;
      }
    },
    cancelEdit() {
      // Восстанавливаем исходные данные
      this.ablation_sites_new = { ...this.ablation_sites };
      this.markedForRemoval = [];
      this.sites_name = [];
      this.editMode = false;
    },
  },
};
</script>

<style>
.form-operation {
  max-width: 900px;
  margin: 0 auto;
  padding: 5px;
}

.operation-table {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;

}

.operation-table th {
  text-align: left;
  padding: 1px;
}

.form-operation input,
.form-operation select,
.form-operation textarea
 {
  padding: 8px;
  background-color: #ffffff;
  border: 2px solid #205a91;
  border-radius: 4px;
  color: #250b0b;
  font-size: 16px;
}

.form-operation textarea {
  min-height: 60px;
  resize: vertical;
}

.edit-button {
  
  background-color: #196a7a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input:disabled,
select:disabled,
textarea:disabled {
  background-color: #f0f0f0;
  color: #212121;
  border-color: #ddd;
}

.ablation-label {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: #196a7a;
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
}

.ablation-edit {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ablation-edit input {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.remove-button {
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.add-button {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #4caf50;
  height: 35px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
