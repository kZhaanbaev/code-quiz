const startBtn = document.querySelector('button');
const timerEl = document.querySelector('.right-span');
const viewHighscoresEl = document.querySelector('.left-span');


startBtn.addEventListener('click', function(){
    function setTimer(element, secondsLeft) {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
          secondsLeft--;
          element.textContent = secondsLeft + " seconds left…";
          if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            sendMessage();
          }
        }, 1000);
      }

});