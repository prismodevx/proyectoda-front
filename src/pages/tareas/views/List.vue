<template>
  <q-page>
    <div class="row align-items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-grey-9">Tareas<span class="q-ml-sm text-weight-regular text-grey-5">{{ rows.length }}</span></div>
      <div style="display: flex; gap: 20px">
        <q-input
          dense
          borderless
          placeholder="Buscar..."
          class="bg-white text-grey-9"
          style="width: 300px; border: 1px solid #d1d5db; border-radius: 6px; background-color: white; padding: 0 10px"
          v-model="inputSearch"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
<!--        <q-select-->
<!--          hide-dropdown-icon-->
<!--          dense-->
<!--          borderless-->
<!--          style="background-color: white; width: 160px; border: 1px solid #D1D5DB; border-radius: 6px"-->
<!--          v-model="modelSelect"-->
<!--          placeholder="seleccionar..."-->
<!--          :options="options"-->
<!--        >-->
<!--          <template v-slot:selected-item="{ opt }">-->
<!--            <div class="q-pl-md truncate-text">{{ opt.label }}</div>-->
<!--          </template>-->
<!--          <template v-slot:append>-->
<!--            <q-icon class="q-pr-sm" name="expand_more" style="color: grey;" />-->
<!--          </template>-->
<!--          <template v-slot:option="scope">-->
<!--            <q-item v-bind="scope.itemProps" style="min-height: 36px">-->
<!--              <q-item-section>-->
<!--                <q-item-label>{{ scope.opt.label }}</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </template>-->
<!--        </q-select>-->
        <Button
          :label="'Exportar'"
          :icon="'system_update_alt'"
          :color="'white'"
          :text-color="'black'"
          :style="'border: 1px solid #D1D5DB'"
          @click="exportPdf"
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
<!--    <Table-->
<!--      :data="rows"-->
<!--      :header="columns"-->
<!--      :context-menu="contextMenu"-->
<!--      @action-context-menu="handleContextMenu"-->
<!--      :loading="loadingTable"-->
<!--    />-->
    <q-table
      :rows="rowsFilteredComputed"
      :columns="columns"
      row-key="id"
      flat
      bordered
      style="border-radius: 6px"
      selection="multiple"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            size="sm"
            round
            icon="edit"
            color="primary"
            @click="edit(props.row)"
            class="q-mr-sm"
          >

          </q-btn>
          <q-btn
            flat
            size="sm"
            round
            icon="delete"
            color="negative"
            @click="remove(props.row.id)"
          >

          </q-btn>
        </q-td>
      </template>
    </q-table>
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
              <div class="col-12">
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Categoria</div>
<!--                <q-input-->
<!--                  placeholder="Escribe una descripcion..."-->
<!--                  outlined-->
<!--                  v-model="tarea.descripcion"-->
<!--                  dense-->
<!--                  type="textarea"-->
<!--                />-->
                <q-select
                  hide-dropdown-icon
                  dense
                  borderless
                  style="background-color: white; border: 1px solid #D1D5DB; border-radius: 6px"
                  v-model="tarea.objCategoria"
                  placeholder="seleccionar..."
                  :options="optionsAllCategoria"
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
              </div>
<!--              <div class="col-6">-->
<!--                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Fecha Inicio</div>-->
<!--                <InputDate-->
<!--                  v-model="tarea.fechaInicio"-->
<!--                  placeholder="dd/MM/aaaa"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="col-6">-->
<!--                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Fecha Fin</div>-->
<!--                <InputDate-->
<!--                  v-model="tarea.fechaFin"-->
<!--                  placeholder="dd/MM/aaaa"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="col-12">-->
<!--                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Deadline</div>-->
<!--                <InputDate-->
<!--                  v-model="tarea.fechaLimite"-->
<!--                  placeholder="dd/MM/aaaa"-->
<!--                />-->
<!--              </div>-->
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
import { onMounted, ref, computed } from 'vue';
import axios from 'axios'
import Table from '../../../components/MyTable.vue'
import Button from '../../../components/MyButton.vue'
import InputDate from '../../../components/MyInputDate.vue'
import { Tarea } from '../interface/Tarea'
import { useAlert } from 'src/composables/useAlert';
import useFetchHttp from '../../../composables/useFetchHttp';
import { useDialogConfirm } from 'src/composables/useDialogConfirm';

const { dialogConfirm } = useDialogConfirm();
import { jwtDecode } from 'jwt-decode';

const { alert } = useAlert();

const { fetchHttp } = useFetchHttp();
/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
const loadingTable = ref(false);

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
    field: 'categoriaNombre',
    name: 'categoriaNombre',
    label: 'Categoria',
    align: 'left',
    sortable: true,
  },
  {
    label: '...',
    name: 'actions',
    field: 'actions',
    align: 'center',
  }
  // {
  //   field: 'fechaInicio',
  //   name: 'fechaInicio',
  //   label: 'Inicio',
  //   align: 'left',
  //   sortable: true,
  // },
  // {
  //   field: 'fechaFin',
  //   name: 'fechaFin',
  //   label: 'Fin',
  //   align: 'left',
  //   sortable: true,
  // },
  // {
  //   field: 'fechaLimite',
  //   name: 'fechaLimite',
  //   label: 'Deadline',
  //   align: 'left',
  //   sortable: true,
  // },
]);

const inputSearch = ref<string>('');

const rowsFilteredComputed = computed(() => {
  const search = inputSearch.value.trim().toLowerCase();

  if (search == '') {
    return rows.value;
  }

  return rows.value.filter((row) => {
    return ['titulo', 'descripcion', 'categoriaNombre'].some((key) => {
      const value: any = row[key];
      return value && value.toString().toLowerCase().includes(search);
    });
  });
});

// combos
const optionsAllCategoria = ref<Array<any>>([]);

const dialog = ref(false);
const refForm = ref(null);

const tarea = ref<Tarea>({
  id: 0,
  titulo: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  fechaLimite: '',
  objCategoria: null,
});

const cleanForm = () => {
  tarea.value = {
    id: 0,
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    fechaLimite: '',
    objCategoria: null,
  };
};
/****************************************************************************/
/*                             API                                          */
/****************************************************************************/
const listComboCategorias = async () => {
  try {
    loadingTable.value = true;

    const response = await fetchHttp({
      method: 'GET',
      endpoint: '/categorias'
    });

    optionsAllCategoria.value = response.data.body.map((e: any) => ({
      value: e.id,
      label: e.nombre,
    }))
  } catch (e: any) {
    console.error(e);
  } finally {
    loadingTable.value = false;
  }
};

const listTareas = async () => {
  try {
    loadingTable.value = true;

    const response = await fetchHttp({
      method: 'GET',
      endpoint: '/tareas'
    });

    rows.value = response.data.body;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  } finally {
    loadingTable.value = false;
  }
};

const save = async () => {
  try {
    const data = {
      id: tarea.value.id,
      titulo: tarea.value.titulo,
      descripcion: tarea.value.descripcion,
      categoriaId: tarea.value.objCategoria.value,
      // fechaInicio: '2024-11-10',
      // fechaFin: '2024-11-17',
      // fechaLimite: '2024-11-30'
    }
    let response: any;

    const token = localStorage.getItem('token');

    if(tarea.value.id == 0) {
      response = await fetchHttp({
        method: 'POST',
        endpoint: '/tareas',
        data: data,
      });
    }
    else {
      // response = await axios.put(URL + '/tareas/' + tarea.value.id, data);

      response = await fetchHttp({
        method: 'PUT',
        endpoint: `/tareas/${tarea.value.id}`,
        data: data,
      });
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
    console.log(item);
    // const response = await axios.get(URL + '/tareas/' + item.id);

    const response = await fetchHttp({
      method: 'GET',
      endpoint: `/tareas/${item.id}`
    });

    tarea.value.id = response.data.body.id;
    tarea.value.titulo = response.data.body.titulo;
    tarea.value.descripcion = response.data.body.descripcion;
    tarea.value.objCategoria = {
      value: response.data.body.categoriaId,
      label: response.data.body.categoriaNombre,
    };

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

const remove = async (id: any) => {
  try {
    dialogConfirm({
      type: 'success',
      title: 'Deseas remover el registro?',
      msg: 'Podras recuperarlos sin problema',
      onOk: async () => {
        const response = await fetchHttp({
          method: 'DELETE',
          endpoint: `/tareas/${id}`
        });

        alert({
          type: 'success',
          title: 'Listo!',
          msg: 'El registro se ha removido satisfactoriamente'
        });
        listTareas();
      },
      onCancel: () => {
        console.log('Cancelado: Acción detenida.');
      },
    });
  } catch (e: any) {
    alert({
      type: 'error',
      title: 'Algo salio mal!',
      msg: e.response.data.message,
    });
    console.log('error: ', e);
  }
}

const exportPdf = async () => {
  try {
    const response = await fetchHttp({
      method: 'GET',
      endpoint: '/tareas/report',
      responseType: 'blob',
      accept: 'application/pdf'
    });

    // Verificar que la respuesta es del tipo 'application/pdf'
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/pdf')) {
      throw new Error('El archivo recibido no es un PDF');
    }

    // Crear un objeto URL para el Blob
    const blob = response.data;

    // Crear un enlace para la descarga del PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Definir el nombre del archivo a descargar
    link.download = 'reporte_tareas.pdf';

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Liberar el objeto URL para evitar pérdidas de memoria
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error('Error al exportar PDF:', e);
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
  listComboCategorias();
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
