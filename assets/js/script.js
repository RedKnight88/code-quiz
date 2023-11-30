var beginBtn = document.querySelector("#begin-btn");
var timerText = document.querySelector("#timer");
var mainEl = document.querySelector("#main");

var scoreTimer = 120;
var currentQuestion = 1;
beginBtn.addEventListener("click", startQuiz);

function startQuiz() {

    scoreTimer = 120;
    var currentQuestion = 1;

    var intervalTimer = setInterval(function() {
        scoreTimer--;
        timerText.textContent = scoreTimer;
        
        if(scoreTimer <= 0) {
            clearInterval(intervalTimer);
            endQuiz();
        }

        if(currentQuestion == 8) {
            clearInterval(intervalTimer);
            endQuiz();
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

        newQuestion();
}

function endQuiz() {
    var childrenMain = mainEl.children;
        for(i = childrenMain.length - 1; i > 0; i--) {
            mainEl.removeChild(childrenMain[i]);
        }
    mainEl.children[0].textContent = "Quiz Complete!"
    var scoreStatement = document.createElement("h2");
    scoreStatement.textContent = "Your final score is" + scoreTimer;

    // might not be right html element, might not be right attribute, check tomorrow
    var scoreForm = document.createElement("form"); 
    scoreForm.setAttribute("type","text");

    mainEl.appendChild(scoreStatement);
    mainEl.appendChild(scoreForm);
}

function newQuestion() {
    var questionIndex = "q" + currentQuestion;
    mainEl.children[0].textContent = questions[questionIndex]["q"];
    for (i = 1; i < 5; i++) {
        var optionIndex = "op" + i;
        var answer = questions[questionIndex][optionIndex];
        mainEl.children[i].textContent = answer;
        if (i == questions[questionIndex]["correctIndex"]) {
            // mainEl.children[i].setAttribute("dataset","correct";)
        }
    }
    currentQuestion++;
}