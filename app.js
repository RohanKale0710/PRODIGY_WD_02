let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

const displayElement = document.getElementById('display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Start/Pause Button
startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

// Reset Button
resetBtn.addEventListener('click', resetTimer);

// Lap Button
lapBtn.addEventListener('click', addLap);

function startTimer() {
  startPauseBtn.textContent = 'Pause';
  resetBtn.disabled = false;
  lapBtn.disabled = false;
  isRunning = true;

  const startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = 'Start';
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  displayTime(elapsedTime);
  startPauseBtn.textContent = 'Start';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsList.innerHTML = ''; // Clear lap records
  lapCounter = 1;
}

function displayTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  displayElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function addLap() {
  const lapTime = displayElement.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapCounter++;
}
