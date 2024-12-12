<template>
  <q-page>
    <div class="q-mb-md text-h4 text-weight-bold">Dashboard de Tareas</div>

    <div class="row col-12 q-mb-lg q-col-gutter-lg">
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold">Tareas Totales</div>
            <div class="text-h6 text-primary">{{ tareasTotales }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold">Completadas</div>
            <div class="text-h6 text-success">{{ tareasCompletadas }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold">En Proceso</div>
            <div class="text-h6 text-warning">{{ tareasEnProceso }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold">Pendientes</div>
            <div class="text-h6 text-warning">{{ tareasPendientes }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row col-12">
      <q-card flat bordered class="col-4 q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md">Tareas por Categoría</div>
          <canvas id="categoriasChart" height="50"></canvas>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="col-4 q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md">Tareas Recientes</div>
          <q-list>
            <q-item v-for="(tarea, index) in tareasRecientes" :key="index">
              <q-item-section>
                <q-item-label>{{ tarea.titulo }}</q-item-label>
                <q-item-label caption>{{ tarea.descripcion }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-badge color="blue" v-if="tarea.estado === 'P'">Pendiente</q-badge>
                <q-badge color="green" v-if="tarea.estado === 'C'">Completada</q-badge>
                <q-badge color="orange" v-if="tarea.estado === 'E'">En progreso</q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="col-4 q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md">Progreso de Tareas</div>
          <canvas id="estadoChart" height="100"></canvas>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Table from '../../../components/MyTable.vue';
import Button from '../../../components/MyButton.vue';
import InputDate from '../../../components/MyInputDate.vue';
import { useAlert } from 'src/composables/useAlert';
import useFetchHttp from '../../../composables/useFetchHttp';
import { useDialogConfirm } from 'src/composables/useDialogConfirm';
import { Chart, registerables } from 'chart.js';

const { fetchHttp } = useFetchHttp();

Chart.register(...registerables);

const tareas = ref([]);

const tareasTotales = computed(() => tareas.value.length);
const tareasCompletadas = computed(() =>
  tareas.value.filter((t) => t.estado === 'C').length
);
const tareasEnProceso = computed(() =>
  tareas.value.filter((t) => t.estado === 'E').length
);
const tareasPendientes = computed(() =>
  tareas.value.filter((t) => t.estado === 'P').length
);
const tareasRecientes = computed(() =>
  tareas.value.slice(0, 3)
);

const categoriasData = computed(() => {
  const counts = tareas.value.reduce((acc, tarea) => {
    acc[tarea.categoriaNombre] = (acc[tarea.categoriaNombre] || 0) + 1;
    return acc;
  }, {});
  return {
    labels: Object.keys(counts),
    data: Object.values(counts),
  };
});

const estadosData = computed(() => {
  return {
    labels: ['Completadas', 'En Proceso', 'Pendientes'],
    data: [
      tareasCompletadas.value,
      tareasEnProceso.value,
      tareasPendientes.value,
    ],
  };
});

const listTareas = async () => {
  try {
    const response = await fetchHttp({
      method: 'GET',
      endpoint: '/tareas',
    });
    tareas.value = response.data.body;
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
  }
};

const setupCategoriasChart = () => {
  const ctx = document.getElementById('categoriasChart').getContext('2d');

  if (categoriasData.value.data.length > 0) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categoriasData.value.labels,
        datasets: [
          {
            data: categoriasData.value.data,
            backgroundColor: ['#42a5f5', '#ff7043', '#66bb6a', '#ab47bc'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }
};

const setupEstadosChart = () => {
  const ctx = document.getElementById('estadoChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: estadosData.value.labels,
      datasets: [
        {
          label: 'Cantidad',
          data: estadosData.value.data,
          backgroundColor: ['#66bb6a', '#ffa726', '#ef5350'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

onMounted(async () => {
  await listTareas();
  setupCategoriasChart();
  setupEstadosChart();
});
</script>

<style scoped>
.card-summary {
  background: #ffffff;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
}
.card-summary .text-h6 {
  margin-top: 5px;
}
</style>
