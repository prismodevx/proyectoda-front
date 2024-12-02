<template>
  <q-page>
    <div class="row align-items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-grey-9">Tareas<span class="q-ml-sm text-weight-regular text-grey-5">{{ rows.length }}</span></div>
      <div style="display: flex; gap: 20px">
        <q-select
          hide-dropdown-icon
          dense
          borderless
          style="background-color: white; width: 160px; border: 1px solid #D1D5DB; border-radius: 6px"
          v-model="modelSelect"
          placeholder="seleccionar..."
          :options="options"
        >
          <template v-slot:selected-item="{ opt }">
            <div class="q-pl-md truncate-text">{{ opt.label }}</div>
          </template>
          <template v-slot:append>
            <q-icon class="q-pr-sm" name="expand_more" style="color: grey;" />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" style="min-height: 36px">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
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
      <q-card class="q-py-sm" style="width: 500px; max-width: 90vw; border-radius: 6px">
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
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Titulo</div>
                <q-input
                  placeholder="Ingresa un titulo..."
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
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Descripcion</div>
                <q-input
                  placeholder="Escribe una descripcion..."
                  outlined
                  v-model="tarea.descripcion"
                  dense
                  type="textarea"
                />
              </div>
              <div class="col-6">
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Fecha Inicio</div>
                <InputDate
                  v-model="tarea.fechaInicio"
                  placeholder="dd/MM/aaaa"
                />
              </div>
              <div class="col-6">
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Fecha Fin</div>
                <InputDate
                  v-model="tarea.fechaFin"
                  placeholder="dd/MM/aaaa"
                />
              </div>
              <div class="col-12">
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Deadline</div>
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
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'
import Table from '../../../components/MyTable.vue'
import Button from '../../../components/MyButton.vue'
import InputDate from '../../../components/MyInputDate.vue'
import { Tarea } from '../interface/Tarea'
import { useAlert } from 'src/composables/useAlert';
import useFetchHttp from '../../../composables/useFetchHttp';
import { jwtDecode } from 'jwt-decode';

const { alert } = useAlert();

const { fetchHttp } = useFetchHttp();
/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
const options = [
  {
    value: 1,
    label: 'Categoriadawdawd'
  },
  {
    value: 2,
    label: 'Categoria 2'
  },
  {
    value: 3,
    label: 'Categoria 3'
  }
];

const modelSelect = ref(null);


const URL = 'http://localhost:8090/api/v1';

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
    const token = localStorage.getItem('token'); // Recupera el token
    if (!token) {
      throw new Error("Token no encontrado en localStorage.");
    }

    const decodedToken = jwtDecode(token);
    const userSub = decodedToken.sub;

    console.log(userSub)
    console.log(token)

    const response = await axios.get('http://localhost:8090/api/v1/tareas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    rows.value = response.data.body;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
    } else {
      console.error("Error en la solicitud:", error.message);
    }
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

    const token = localStorage.getItem('token');

    if(tarea.value.id == 0) {
      response = await axios.post('http://localhost:8090/api/v1/tareas', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    else {
      response = await axios.put(URL + '/tareas/' + tarea.value.id, data);
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
    const response = await axios.get(URL + '/tareas/' + item.id);
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
onMounted( () => {
  listTareas();
});

</script>

<style>
.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 36px !important;
}

.q-field--auto-height .q-field__control {
  height: 36px !important;
}
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

</style>
