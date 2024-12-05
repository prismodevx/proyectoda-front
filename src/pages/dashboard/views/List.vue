<template>
  <q-page>
    <div class="q-mb-md text-h4 text-weight-bold">Dashboard</div>

    <div dense class="row col-12 q-mb-md q-col-gutter-lg">
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Usuarios</div>
            <div class="text-h6 text-primary">1,250</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Tareas Completas</div>
            <div class="text-h6 text-success">567</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Proyectos</div>
            <div class="text-h6 text-info">34</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="card-summary">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Pendientes</div>
            <div class="text-h6 text-warning">23</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Sección de Gráficas -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-md">Actividad Reciente</div>
        <canvas id="activityChart" height="100"></canvas>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

onMounted(() => {
  const ctx = document.getElementById("activityChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Tareas Completas",
          data: [10, 15, 25, 30, 40, 55, 70],
          borderColor: "#42a5f5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          fill: true,
        },
        {
          label: "Tareas Pendientes",
          data: [8, 12, 18, 22, 35, 50, 65],
          borderColor: "#ff7043",
          backgroundColor: "rgba(255, 112, 67, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            drawBorder: false,
          },
        },
      },
    },
  });
});
</script>

<style scoped>
.card-summary {
  background: #ffffff;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}
.card-summary .text-h6 {
  margin-top: 5px;
}
</style>
