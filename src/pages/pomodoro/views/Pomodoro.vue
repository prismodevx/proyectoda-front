<template>
  <div class="q-pa-md flex flex-center column">
    <q-card
      flat
      class="bg-white q-mt-md"
      style="border: 1px solid #d1d5db; border-radius: 6px; width: 300px;"
    >
      <!-- Encabezado -->
      <q-card-section class="bg-primary text-white text-center q-pa-sm">
        <div class="text-h5">Pomodoro Timer</div>
      </q-card-section>

      <!-- Temporizador -->
      <q-card-section class="q-pa-md flex flex-center column">
        <div class="text-h1 text-weight-regular text-grey-9">{{ formattedTime }}</div>
        <div class="text-caption text-grey q-mt-xs" style="font-size: 16px">
          Tiempo restante
        </div>
      </q-card-section>

      <!-- Acciones -->
      <q-card-actions align="center" class="q-pa-md">
        <q-btn
          label="Iniciar"
          color="positive"
          push
          rounded
          size="md"
          icon="play_arrow"
          @click="startTimer"
          :disable="store.isRunning"
        />
        <q-btn
          label="Pausar"
          color="warning"
          push
          rounded
          size="md"
          icon="pause"
          class="q-ml-sm q-mr-sm"
          @click="pauseTimer"
          :disable="!store.isRunning"
        />
        <q-btn
          label="Reiniciar"
          color="negative"
          push
          rounded
          class="q-mt-md"
          size="md"
          icon="restart_alt"
          @click="stopTimer"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePomodoroStore } from 'stores/pomodoroStore';

const store = usePomodoroStore();

const formattedTime = computed(() => {
  const minutes = Math.floor(store.remainingTime / 60);
  const seconds = store.remainingTime % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const { startTimer, pauseTimer, stopTimer, restoreState } = store;

// Solicita permisos para notificaciones al cargar el componente
onMounted(() => {
  restoreState();
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
});
</script>
