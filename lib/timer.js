export default class Timer {
    constructor() {
        this.startTime;
        this.stopwatchInterval;
        this.elapsedTime = 0;
    }

    startTimer() {
        if (!this.stopwatchInterval) {
            this.startTime = new Date().getTime();
            this.stopwatchInterval = setInterval(this.updateTimer.bind(this), 10);
        }
    }

    stopTimer() {
        clearInterval(this.stopwatchInterval);
        this.elapsedTime = new Date().getTime() - this.startTime;
        this.stopwatchInterval = null;
    }

    updateTimer() {
        let currentTime = new Date().getTime();
        this.elapsedTime = currentTime - this.startTime;
    }

    convertElapsedTime(time, forScoreBoard=false) {
        let milliseconds = Math.floor((time % 1000)/10);
        let seconds = Math.floor(time / 1000) % 60;
        let minutes = Math.floor(time / 1000 / 60) % 60;
        if (forScoreBoard || minutes !== 0) {
            minutes = this.pad(minutes) + ":";
            seconds = this.pad(seconds);
        } else {
            minutes = "";
        }
        let displayTime = minutes + seconds + "." + this.pad(milliseconds);
        return displayTime;
    }

    pad(num) {
        return (num < 10 ? "0" : "") + num;
    }
}