let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
        }
        displayTimeLeft(secondsLeft); 
    }, 1000)
    console.log({now, then});
}

function displayTimeLeft(seconds) {
    let remainderSeconds = seconds;
    const hours = Math.floor(remainderSeconds / 3600);
    remainderSeconds = remainderSeconds % 3600;
    const minutes = Math.floor(remainderSeconds / 60);
    remainderSeconds = remainderSeconds % 60;
    const displayTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainderSeconds)}`;
    timerDisplay.textContent = displayTime;
    document.title = displayTime;
    
    console.log({hours, minutes, remainderSeconds});
}

function formatTime(value) {
    return value >= 10 ? value : '0' + value;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Will be back at ${hour}:${formatTime(minutes)}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const mins = this.minutes.value;
      timer(mins * 60);
      this.reset();
})