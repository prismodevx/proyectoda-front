<template>
  <q-page>
    <div class="row align-items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-grey-9">Tareas</div>
      <div style="display: flex; gap: 20px">
        <Button
          :label="'Exportar'"
          :icon="'system_update_alt'"
          :color="'white'"
          :text-color="'black'"
          :style="'border: 1px solid #D1D5DB'"
        >
        </Button>
        <Button
          :label="'Nuevo'"
          :icon="'add'"
          :color="'primary'"
          :text-color="'white'"
          @click="openDialog"
        >
        </Button>
      </div>
    </div>
    <Table
      :data="rows"
      :header="columns"
      :context-menu="contextMenu"
      @action-context-menu="handleContextMenu"
    />
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 500px; max-width: 90vw; border-radius: 6px">
        <q-card-section class="q-px-lg q-py-sm flex-center row justify-between">
          <div class="text-weight-bold text-h6 text-grey-9">
            Nueva tarea
          </div>
          <Button
            :icon="'close'"
            :color="'white'"
            :text-color="'black'"
            round
            size="md"
            @click="closeDialog"
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-md">
          <q-form greedy ref="refForm">
            <div class="row q-col-gutter-y-md q-col-gutter-x-md">
              <div class="col-12">
                <div class="text-grey-7 q-mb-xs">Titulo</div>
                <q-input
                  outlined
                  v-model="tarea.titulo"
                  dense
                  hide-bottom-space
                  no-error-icon
                  :rules="[
                    (v) => {
                      return !!v || 'El campo es obligatorio'
                    }
                  ]"
                />
              </div>
              <div class="col-12">
                <div class="text-grey-7 q-mb-xs">Descripcion</div>
                <q-input
                  outlined
                  v-model="tarea.descripcion"
                  dense

                  type="textarea"
                />
              </div>
              <div class="col-6">
                <div class="text-grey-7 q-mb-xs">Fecha Inicio</div>
                <InputDate
                  v-model="tarea.fechaInicio"
                  placeholder="dd/MM/aaaa"
                />
              </div>
              <div class="col-6">
                <div class="text-grey-7 q-mb-xs">Fecha Fin</div>
                <InputDate
                  v-model="tarea.fechaFin"
                  placeholder="dd/MM/aaaa"
                />
              </div>
              <div class="col-12">
                <div class="text-grey-7 q-mb-xs">Deadline</div>
                <InputDate
                  v-model="tarea.fechaLimite"
                  placeholder="dd/MM/aaaa"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm flex justify-end">
          <div style="display: flex; gap: 20px;">
            <Button
              :label="'Cancelar'"
              :color="'white'"
              :text-color="'black'"
              @click="closeDialog"
            >
            </Button>
            <Button
              :label="'Guardar'"
              :color="'primary'"
              :text-color="'white'"
              @click="validateSave"
            >
            </Button>
          </div>
        </q-card-section>
      </q-card>

    </q-dialog>
<!--    <q-dialog persistent :model-value="true">-->
<!--      <q-card style="width: 400px; border-radius: 6px">-->
<!--        <q-card-section class="q-pa-none flex justify-end q-ma-sm">-->
<!--          <Button-->
<!--            :icon="'close'"-->
<!--            :color="'white'"-->
<!--            :text-color="'black'"-->
<!--            round-->
<!--            size="md"-->
<!--          />-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none" style="display: flex; flex-direction: column; gap: 10px; align-items: center;">-->
<!--          <img src="../../../assets/success.svg" alt="" style="width: 120px">-->
<!--          <div class="text-h6 text-weight-bold text-grey-9">Listo!</div>-->
<!--          <div class="text-weight-medium text-grey-6">El registro se ha creado satisfactoriamente.</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none q-my-sm" style="display: flex; flex-direction: column; gap: 10px; align-items: center;">-->
<!--          <Button-->
<!--            :label="'Continuar'"-->
<!--            :color="'positive'"-->
<!--            :text-color="'white'"-->
<!--          />-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'
import Table from '../../../components/MyTable.vue'
import Button from '../../../components/MyButton.vue'
import InputDate from '../../../components/MyInputDate.vue'
import { Tarea } from '../interface/Tarea'
import { useAlert } from '../../../composables/useAlert';

const { alert } = useAlert();
/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/

const URL = 'http://localhost:8090/api/v1/';

const rows = ref([]);
const columns = ref([
  {
    field: 'id',
    name: 'id',
    label: '#',
    align: 'left',
    sortable: true,
  },
  {
    field: 'titulo',
    name: 'titulo',
    label: 'Titulo',
    align: 'left',
    sortable: true,
  },
  {
    field: 'descripcion',
    name: 'descripcion',
    label: 'Descripcion',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fechaInicio',
    name: 'fechaInicio',
    label: 'Inicio',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fechaFin',
    name: 'fechaFin',
    label: 'Fin',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fechaLimite',
    name: 'fechaLimite',
    label: 'Deadline',
    align: 'left',
    sortable: true,
  },
]);

const dialog = ref(false);
const refForm = ref(null);

const tarea = ref<Tarea>({
  id: 0,
  titulo: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  fechaLimite: '',
});

const cleanForm = () => {
  tarea.value = {
    id: 0,
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    fechaLimite: '',
  };
};

const contextMenu = ref([
  {
    text: 'Editar',
    icon: 'edit',
    func: 'update',
    type: 'normal'
  },
  {
    text: 'Eliminar',
    icon: 'delete',
    func: 'delete',
    type: 'remove'
  }
]);

const handleContextMenu = async ({ action, row }) => {
  switch (action) {
    case 'update':
      console.log('editar', row);
      await edit(row);
      break;
    case 'delete':
      console.log('eliminar', row);
      break;
  }
};
/****************************************************************************/
/*                             API                                          */
/****************************************************************************/
const listTareas = async () => {
  try {
    const response = await axios.get(URL + 'tareas');

    rows.value = response.data.body;
  } catch (e) {
    console.log('error: ', e);
  } finally {

  }
};

const save = async () => {
  try {
    const data = {
      id: tarea.value.id,
      titulo: tarea.value.titulo,
      descripcion: tarea.value.descripcion,
      fechaInicio: '2024-11-10',
      fechaFin: '2024-11-17',
      fechaLimite: '2024-11-30'
    }
    let response: any;

    if(tarea.value.id == 0) {
      response = await axios.post(URL + 'tareas/', data);
    }
    else {
      response = await axios.put(URL + 'tareas/' + tarea.value.id, data);
    }

    if(response.data.ok) {
      const id = tarea.value.id;
      closeDialog();
      listTareas();
      alert({
        type: 'success',
        title: 'Listo!',
        msg: `El registro se ha ${ id == 0 ? 'creado' : 'actualizado' } satisfactoriamente`
      });
    }
  } catch (e: any) {
    alert({
      type: 'error',
      title: 'Algo salio mal!',
      msg: e.response.data.message,
    });
    console.log('error: ', e);
  } finally {

  }
};

const validateSave = async () => {
  if(refForm.value) {
    await refForm.value.validate().then(async (success: any) => {
      if (success) {
        await save();
      }
    });
  }
};

const edit = async (item: any) => {
  try {
    const response = await axios.get(URL + 'tareas/' + item.id);
    tarea.value = { ...response.data.body };
    openDialog();
  } catch (e: any) {
    alert({
      type: 'error',
      title: 'Algo salio mal!',
      msg: e.response.data.message,
    });
    console.log('error: ', e);
  }
};
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  cleanForm();
};


/****************************************************************************/
/*                           LIFECYCLE                                      */
/****************************************************************************/
onMounted(async () => {
  await listTareas();
});

</script>

<style scoped>

</style>
