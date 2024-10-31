<template>
  <div>Holaaa</div>
  <q-table
    :rows="rows"
    :columns="columns"
    rowKey="id"
    flat
  >
    <template #top-left>
      <q-input
        outlined
        dense
        placeholder="Search"
        class="q-mb-sm"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #top-right>
      <q-btn
        unelevated
        no-caps
        square
        icon="export"
        label="Export"
      >
      </q-btn>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/';

const rows = ref([]);
const columns = ref([
  {
    field: 'id',
    name: 'id',
    label: '#',
    align: 'left'
  },
  {
    field: 'titulo',
    name: 'titulo',
    label: 'Titulo',
    align: 'left'
  },
  {
    field: 'descripcion',
    name: 'descripcion',
    label: 'Descripcion',
    align: 'left'
  },
  {
    field: 'fechaInicio',
    name: 'fechaInicio',
    label: 'Inicio',
    align: 'left'
  },
  {
    field: 'fechaFin',
    name: 'fechaFin',
    label: 'Fin',
    align: 'left'
  },
  {
    field: 'fechaLimite',
    name: 'fechaLimite',
    label: 'Deadline',
    align: 'left'
  },
]);

const listTareas = async () => {
  try {
    const response = await axios.get(URL + 'tareas');

    rows.value = response.data.body;
  } catch (e) {
    console.log('error: ', e);
  } finally {

  }
};

onMounted(async () => {
  await listTareas();
});

</script>

<style scoped>

</style>
