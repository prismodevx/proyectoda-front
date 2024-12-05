<template>
  <q-page>
    <div class="row align-items-center flex-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-grey-9">Categorias<span class="q-ml-sm text-weight-regular text-grey-5">{{ rows.length }}</span></div>
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
        <Button
          :label="'Exportar'"
          :icon="'system_update_alt'"
          :color="'white'"
          :text-color="'black'"
          :style="'border: 1px solid #D1D5DB'"
          @click="exportPdf"
        />
        <Button
          :label="'Nuevo'"
          :icon="'add'"
          :color="'primary'"
          :text-color="'white'"
          @click="openDialog"
        />
      </div>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      style="border-radius: 6px"
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
            Nueva categoria
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
                <div class="text-grey-7 text-weight-bold q-mb-xs" style="font-size: 13px">Nombre</div>
                <q-input
                  placeholder="Ingresa un nombre..."
                  outlined
                  v-model="categoria.nombre"
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

import Button from 'components/MyButton.vue';
import InputDate from 'components/MyInputDate.vue';
import { onMounted, ref } from 'vue';
import { Categoria } from 'pages/categorias/interface/Categoria';
import useFetchHttp from '../../../composables/useFetchHttp';
import { useAlert } from 'src/composables/useAlert';
import { useDialogConfirm } from 'src/composables/useDialogConfirm';

const { dialogConfirm } = useDialogConfirm();
const { alert } = useAlert();
const { fetchHttp } = useFetchHttp();
/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
// carga de tabla
const loadingTable = ref(false);

// filas y columnas de tabla
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
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre',
    align: 'left',
    sortable: true,
  },
  {
    label: '...',
    name: 'actions',
    field: 'actions',
    align: 'center',
  }
]);

// dialogo de registro y actualizacion
const dialog = ref(false);

// ref para validar rules de formulario
const refForm = ref(null);

// entidad
const categoria = ref<Categoria>({
  id: 0,
  nombre: ''
});

/****************************************************************************/
/*                             API                                          */
/****************************************************************************/
const listCategorias = async () => {
  try {
    loadingTable.value = true;

    const response = await fetchHttp({
      method: 'GET',
      endpoint: '/categorias'
    });

    rows.value = response.data.body;
  } catch (e: any) {
    console.error(e);
  } finally {
    loadingTable.value = false;
  }
};

// validacion de campos antes de save
const validateSave = async () => {
  if(refForm.value) {
    await refForm.value.validate().then(async (success: any) => {
      if (success) {
        await save();
      }
    });
  }
};

const save = async () => {
  try {
    // se define el body para el envio del request
    const data = categoria.value;

    // response
    let response;

    // CREACION
    if (data.id == 0) {
      response = await fetchHttp({
        method: 'POST',
        endpoint: '/categorias',
        data: data,
      });
    }
    // EDICION
    else {
      response = await fetchHttp({
        method: 'PUT',
        endpoint: `/categorias/${data.id}`,
        data: data,
      });
    }

    // mensaje alert general
    if (response.data.ok) {
      listCategorias();
      closeDialog();
      alert({
        type: 'success',
        title: 'Listo!',
        msg: `El registro se ha ${ data.id == 0 ? 'creado' : 'actualizado' } satisfactoriamente`
      });
    }
  } catch (e: any) {
    console.error(e);
  }
};

const edit = async (item: any) => {
  try {
    const response = await fetchHttp({
      method: 'GET',
      endpoint: `/categorias/${item.id}`
    });

    categoria.value = { ...response.data.body };
    openDialog();
  } catch (e: any) {
    console.error(e);
  }
};

const remove = async (id: any) => {
  try {
    dialogConfirm({
      type: 'success',
      title: 'Deseas remover el registro?',
      msg: 'Esto tal vez dejaria sin categoria a algunas tareas',
      onOk: async () => {
        const response = await fetchHttp({
          method: 'DELETE',
          endpoint: `/categorias/${id}`
        });

        alert({
          type: 'success',
          title: 'Listo!',
          msg: 'El registro se ha removido satisfactoriamente'
        });
        listCategorias();
      },
      onCancel: () => {
        console.log('Cancelado: Acción detenida.');
      },
    });
  } catch (e: any) {
    console.log('error: ', e);
  }
};
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const cleanForm = () => {
  categoria.value.id = 0;
  categoria.value.nombre = '';
};

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
onMounted(() => {
  listCategorias();
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
