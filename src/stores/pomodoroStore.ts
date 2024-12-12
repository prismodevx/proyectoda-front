import { defineStore } from 'pinia';

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    startTime: 10, // Duración inicial en segundos (25 minutos)
    remainingTime: 10, // Tiempo restante en segundos
    isRunning: false, // Indica si el temporizador está corriendo
    intervalId: null as null | number, // Referencia al intervalo
    alarm: new Audio('/audio/audio.mp3'), // Ruta al archivo de audio
  }),
  actions: {
    startTimer() {
      if (this.isRunning) return;

      const endTime = Date.now() + this.remainingTime * 1000;
      this.isRunning = true;

      this.intervalId = setInterval(() => {
        const currentTime = Math.floor((endTime - Date.now()) / 1000);
        if (currentTime <= 0) {
          this.stopTimer();
          this.triggerNotification(); // Al finalizar, dispara la notificación y alarma
          return;
        }
        this.remainingTime = currentTime;
        localStorage.setItem(
          'pomodoroTime',
          JSON.stringify({
            remainingTime: this.remainingTime,
            isRunning: this.isRunning,
            endTime,
          })
        );
      }, 1000) as unknown as number;
    },
    pauseTimer() {
      if (!this.isRunning) return;
      this.isRunning = false;
      clearInterval(this.intervalId!);
      localStorage.setItem(
        'pomodoroTime',
        JSON.stringify({
          remainingTime: this.remainingTime,
          isRunning: this.isRunning,
        })
      );
    },
    stopTimer() {
      this.isRunning = false;
      this.remainingTime = this.startTime;
      clearInterval(this.intervalId!);
      localStorage.removeItem('pomodoroTime');
    },
    triggerNotification() {
      // Reproduce la alarma
      this.alarm.play();

      // Muestra una notificación si los permisos están concedidos
      if (Notification.permission === 'granted') {
        new Notification('¡Pomodoro finalizado!', {
          body: 'Es hora de tomar un descanso o iniciar otra sesión.',
          icon: '/img/pomodoro-icon.png', // Opcional: Ruta a un icono personalizado
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('¡Pomodoro finalizado!', {
              body: 'Es hora de tomar un descanso o iniciar otra sesión.',
            });
          }
        });
      }
    },
    restoreState() {
      const savedState = localStorage.getItem('pomodoroTime');
      if (savedState) {
        const { remainingTime, isRunning, endTime } = JSON.parse(savedState);
        this.remainingTime = remainingTime;
        this.isRunning = isRunning;

        if (isRunning) {
          const timeLeft = Math.floor((endTime - Date.now()) / 1000);
          if (timeLeft > 0) {
            this.remainingTime = timeLeft;
            this.startTimer();
          } else {
            this.stopTimer();
          }
        }
      }
    },
  },
});
