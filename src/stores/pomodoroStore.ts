import { defineStore } from 'pinia';

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    startTime: 1 * 60, // 25 minutos en segundos
    remainingTime: 1 * 60,
    isRunning: false,
    intervalId: null as null | number,
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
          return;
        }
        this.remainingTime = currentTime;
        localStorage.setItem('pomodoroTime', JSON.stringify({
          remainingTime: this.remainingTime,
          isRunning: this.isRunning,
          endTime,
        }));
      }, 1000) as unknown as number;
    },
    pauseTimer() {
      if (!this.isRunning) return;
      this.isRunning = false;
      clearInterval(this.intervalId!);
      localStorage.setItem('pomodoroTime', JSON.stringify({
        remainingTime: this.remainingTime,
        isRunning: this.isRunning,
      }));
    },
    stopTimer() {
      this.isRunning = false;
      this.remainingTime = this.startTime;
      clearInterval(this.intervalId!);
      localStorage.removeItem('pomodoroTime');
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
