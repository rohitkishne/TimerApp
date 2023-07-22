const newTimer = document.getElementById("new-timer");
const setTime = document.getElementById("set-btn");

let newTimeradded = [];

function convertToSeconds(hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
}

function updateTimerDisplay() {
  newTimeradded.forEach((timerData, index) => {
    const timerElement = document.querySelector(`#timer-${index}`);
    let remainingTime = timerData.remainingTime;

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    timerElement.innerHTML = `<form class="set-new-timer" id="timer-${index}">
                                <div id="setTime" class="setTime">Time Left:</div>
                                <div id="hr-min-sec" class="hr-min-sec">
                                    <input type="number" name="time-value" id="time-value" value=${formatTimehr(timerData.remainingTime)} class="time" placeholder="HH" min="1" max="12" readonly>
                                    <span>:</span>
                                    <input type="number" name="time-value" class="time" value=${formatTimemin(timerData.remainingTime)} placeholder="MM" min="0" max="60" readonly>
                                    <span>:</span>
                                    <input type="number" name="time-value" class="time" value=${formatTimesec(timerData.remainingTime)} placeholder="SS" min="0" max="60" readonly>
                                </div>
                                <button id="delete-btn" onclick="deleteTime(${index})" class="set-btn">Delete</button>
                            </form>`;

    if (remainingTime > 0) {
      timerData.remainingTime -= 1;
    } else {
      clearInterval(timerData.intervalId);
      const deleteToStop = document.getElementById("delete-btn");
      deleteToStop.textContent = 'Stop';
      deleteToStop.style.backgroundColor = 'black'
      deleteToStop.style.color ='white'

      const newTimerStyle = document.querySelector(".set-new-timer")
      newTimerStyle.style.backgroundColor = 'Yellow'
      newTimerStyle.style.color = 'black'  
      
      document.getElementById('setTime').remove();

      const timeEnded = document.getElementById('hr-min-sec');
      timeEnded.innerHTML = `Time is Up!`;
      timeEnded.style.color = 'black';
    }
  });
}

function startTimer() {
  const hours = parseInt(document.getElementById('hr-value').value, 10) || 0;
  const minutes = parseInt(document.getElementById('min-value').value, 10) || 0;
  const seconds = parseInt(document.getElementById('sec-value').value, 10) || 0;

  const totalSeconds = convertToSeconds(hours, minutes, seconds);
  const timerData = {
    remainingTime: totalSeconds,
    intervalId: null,
  };

  newTimeradded.push(timerData);

  addNewTime(newTimeradded);

  document.getElementById("hr-value").value = '';
  document.getElementById("min-value").value = '';
  document.getElementById("sec-value").value = '';

  if (timerData.intervalId !== null) {
    clearInterval(timerData.intervalId);
  }

  timerData.intervalId = setInterval(updateTimerDisplay, 1000);
}

setTime.addEventListener('click', (event) => {
  event.preventDefault();
  startTimer();
});

function addNewTime(data) {
  newTimer.innerHTML = '';
  data.forEach((timerData, index) => {
    newTimer.innerHTML += `<form class="set-new-timer" id="timer-${index}">
                              <div id="setTime" class="setTime">Time Left:</div>
                              <div id="hr-min-sec" class="hr-min-sec">
                                <input type="number" name="time-value" id="time-value" value=${formatTimehr(timerData.remainingTime)} class="time" placeholder="HH" min="1" max="12" readonly>
                                <span>:</span>
                                <input type="number" name="time-value" class="time" value=${formatTimemin(timerData.remainingTime)} placeholder="MM" min="0" max="60" readonly>
                                <span>:</span>
                                <input type="number" name="time-value" class="time" value=${formatTimesec(timerData.remainingTime)} placeholder="SS" min="0" max="60" readonly>
                              </div>
                              <button id="delete-btn" onclick="deleteTime(${index})" class="set-btn">Delete</button>
                            </form>`;
  });
}

function formatTimehr(remainingTime) {
  const hours = Math.floor(remainingTime / 3600);
  return `${hours.toString().padStart(2, '0')}`;
}
function formatTimemin(remainingTime) {
  const minutes = Math.floor((remainingTime % 3600) / 60);
 
  return `${minutes.toString().padStart(2, '0')}`;
}
function formatTimesec(remainingTime) {
  const seconds = remainingTime % 60; 
  return `${seconds.toString().padStart(2, '0')}`;
}




function deleteTime(index) {
  clearInterval(newTimeradded[index].intervalId);
  newTimeradded.splice(index, 1);

  if (newTimeradded.length === 0) {
    document.getElementById("empty-timer").innerText = 'You have no timers currently!';
  } else {
    addNewTime(newTimeradded);
  }
}
