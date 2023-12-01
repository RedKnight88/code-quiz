var beginBtn = document.querySelector("#begin-btn");
var timerText = document.querySelector("#timer");
var mainEl = document.querySelector("#main");

var scoreTimer = 120;
var currentQuestion = 1;
beginBtn.addEventListener("click", startQuiz);

function startQuiz() {

    scoreTimer = 120;
    currentQuestion = 1;
    var showAnswer = document.createElement("h5");

    var intervalTimer = setInterval(function() {
        scoreTimer--;
        timerText.textContent = scoreTimer;
        
        if(scoreTimer <= 0) {
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
                var correctCheck = event.target.dataset.answer;
                if (correctCheck == "correct") {
                    showAnswer.textContent = "Correct!";
                } else {
                    scoreTimer -= 15;
                    showAnswer.textContent = "Incorrect!";
                }

                // maybe remove the or equals here, this is also hardcoded
                if(currentQuestion >= 8) {
                    clearInterval(intervalTimer);
                    endQuiz();
                } else {
                newQuestion();
                }
            });

            mainEl.appendChild(showAnswer);
        }

        newQuestion();
}

function endQuiz() {
    document.querySelector("#timer").remove();
    var childrenMain = mainEl.children;
        for(i = childrenMain.length - 1; i > 0; i--) {
            mainEl.removeChild(childrenMain[i]);
        }
    mainEl.children[0].textContent = "Quiz Complete!"
    var scoreStatement = document.createElement("h2");
    scoreStatement.textContent = "Your final score is " + scoreTimer;

    // might not be right html element, might not be right attribute, check tomorrow
    var entryEl = document.createElement("h6");
    var scoreForm = document.createElement("input"); 
    var scoreSubmit = document.createElement("button"); 
    scoreForm.setAttribute("type","text");
    entryEl.textContent = "Enter initials: "
    scoreSubmit.textContent = "Submit!"

    // add event listener
    scoreSubmit.addEventListener("click", function() {
        var entry = {
            initials: scoreForm.value,
            score: scoreTimer,
        }
        if (JSON.parse(localStorage.getItem("Leaderboard")) == undefined || JSON.parse(localStorage.getItem("Leaderboard")) == null) {
            const firstArray = [entry];
            localStorage.setItem("Leaderboard", JSON.stringify(firstArray));
        } else {
            const leaderArray = JSON.parse(localStorage.getItem("Leaderboard"));
            leaderArray.push(entry);
            localStorage.setItem("Leaderboard", JSON.stringify(leaderArray)); 
        }       
        window.open("./leaderboard.html","_self")
    })

    mainEl.appendChild(scoreStatement);
    mainEl.appendChild(entryEl);
    entryEl.appendChild(scoreForm);
    entryEl.appendChild(scoreSubmit);
}

function newQuestion() {
    var questionIndex = "q" + currentQuestion;
    mainEl.children[0].textContent = questions[questionIndex]["q"];
    for (i = 1; i < 5; i++) {
        var optionIndex = "op" + i;
        var answer = questions[questionIndex][optionIndex];
        mainEl.children[i].textContent = answer;
        if (i == questions[questionIndex]["correctIndex"]) {
            mainEl.children[i].setAttribute("data-answer","correct");
        } else {
            mainEl.children[i].setAttribute("data-answer","false");
        }
    }
    currentQuestion++;
}