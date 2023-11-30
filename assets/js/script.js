var beginBtn = document.querySelector("#begin-btn");
var timerText = document.querySelector("#timer");
var mainEl = document.querySelector("#main");

var scoreTimer = 120;

beginBtn.addEventListener("click", startQuiz);

function startQuiz() {
    scoreTimer = 120;
    var intervalTimer = setInterval(function() {
        scoreTimer--;
        timerText.textContent = scoreTimer;
        
        if(scoreTimer <= 0) {
            clearInterval(intervalTimer);
            // switch to name entry scene which will remove the timer anyways
        }
    }, 1000);

        // remove the children of main (except h1, which will be used)
        var childrenMain = mainEl.children;
        for(i = childrenMain.length - 1; i > 0; i--) {
            mainEl.removeChild(childrenMain[i]);
        }
        
        // add children of main, set framework for question scene
        for (i = 0; i < 4; i++) {
            var option = document.createElement("button");
            option.setAttribute("class",".option");
            mainEl.appendChild(option); 
            option.addEventListener("click", function (event) {
                // grab dataset attribute for whether the answer was correct or not
                // if correct, write message
                // else, detract time, write message
                // function to grab new questions
            });
        }

        // function to grab questions
}

function endQuiz() {
    // remove children from main besides h1
    // add h2 stating score
    // add form
}

function newQuestion() {

    // during for, if i = correct index, questions.[currentQuestion].[i] 
    // (now, answer) .setAttribute(dataset*something*,correct)
}