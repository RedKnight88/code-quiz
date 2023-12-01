/* I begin by initializing variables I'll need inside multiple functions or outside of
those functions. I make element variables for the span element in the header, the button
to start the quiz, and the main element of the body, which is the container which will
have its content being interchanged by the script.*/
var beginBtn = document.querySelector("#begin-btn");
var timerText = document.querySelector("#timer");
var mainEl = document.querySelector("#main");

/* Next I initialize the timer, which is used in multiple spots as it doubles as the score.
I also have this variable called "currentQuestion" which is a counter that tracks the progress
of the quiz and is used to ensure the quiz ends when all the questions are called, as well as
bringing in the correct question. Last is the event listener to begin the quiz, which the page
needs on startup, so it's initialized here.*/
var scoreTimer = 120;
var currentQuestion = 0;

beginBtn.addEventListener("click", startQuiz);

// As much as I love my block comments, there's too much to cover, so I'll have multiple sections.
function startQuiz() {
    // This element needs to wait for a button click for its content to be set, then gets appended
    // after the click, so we initialize it before the fun stuff.
    var showAnswer = document.createElement("h5");

    // This sets the countdown timer, updating at a blazing 1hz. Each second, the timer's text
    // content reflects the counting, and we set an endpoint for the timer at 0 seconds.
    // This endpoint also calls the end quiz function, which takes the user to a result entry screen.
    var intervalTimer = setInterval(function() {
        scoreTimer--;
        timerText.textContent = scoreTimer;
        
        if(scoreTimer <= 0) {
            clearInterval(intervalTimer);
            endQuiz();
        }
    }, 1000);

    // Removes the children of main (except h1, which will be used), in order to be replaced
    // by the framework for the quiz questions.
    var childrenMain = mainEl.children;
    for(i = childrenMain.length - 1; i > 0; i--) {
        mainEl.removeChild(childrenMain[i]);
    }
        
    /* This for loop is a doozy. Each question holds a certain number of multiple choice options,
    and each of those options needs: a button element created, an attribute assigned, 
    the element added to the page render, and an event listener (for clicking the button).

    Now each event listener needs to check whether or not it was the correct answer, dock
    time from the timer if it IS incorrect, and change the feedback text at the bottom of the 
    options. The last thing it does is check whether or not we've run out of questions, in which
    case it will close out the update function and change to the results entry scene. If that 
    conditional is not met, we grab another question (remember, this is the event listener, 
    this function call will never happen before the one at the end of the entire startquiz function).

    Now this ensures that we don't have to create new elements each time we bring in new
    questions, all we have to do is update some text and the attributes for each button. */
    for (i = 0; i < questions[0].options.length; i++) {
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

            if(currentQuestion >= questions.length) {
                clearInterval(intervalTimer);
                endQuiz();
            } else {
            newQuestion();
            }
        });
    }
    // When all that is done we can finally add that last element for feedback on the previous answer.
    mainEl.appendChild(showAnswer);
    // But, we still haven't put text into those buttons, or replaced the question text. Time to do that!
    newQuestion();
}

/* I haven't been this long-winded in a while! Apologies! It's past midnight and I am loopy.
This function is similar to the start quiz function, but of course has its nuances.
It begins by removing the timer, the buttons in the main element, and replaces the main text
to signify the completion of the quiz. Then, elements are added to explain the form submission,
add the form submission, and a fancy newfangled button, what form is complete without a shiny button?!

The event listener for the button is where it really goes to funky town. In order for an array of
objects to be properly parsed from localStorage, the use case of nothing being there needed to be
taken into account. Since array initializing got really funky on me, I just used two differently named
arrays and contained them to the different conditions, even though putting the storage function in those
conditionals might not be completely DRY. If there's nothing in local storage, make an array with one
object, and store. If there are objects, put that array back in a usable form, add the new entry to the end
and back into storage it goes. Lastly, it makes the user go immediately to the leaderboard page. 

To finish out, the function adds everything to the webpage to be rendered and interacted with.*/
function endQuiz() {

    document.querySelector("#timer").remove();
    var childrenMain = mainEl.children;
    for(i = childrenMain.length - 1; i > 0; i--) {
        mainEl.removeChild(childrenMain[i]);
    }

    mainEl.children[0].textContent = "Quiz Complete!"
    var scoreStatement = document.createElement("h2");
    scoreStatement.textContent = "Your final score is " + scoreTimer;

    var entryEl = document.createElement("h6");
    var scoreForm = document.createElement("input"); 
    var scoreSubmit = document.createElement("button"); 
    scoreForm.setAttribute("type","text");
    entryEl.textContent = "Enter initials: "
    scoreSubmit.textContent = "Submit!"

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

/* Saved the best for last! This utilizes all of the prior setup to create a very elegant solution
to updating the most important part of the quiz, its questions! This sets the text within each
element in the main section, according to the question objects initialized in the questions.js file!
It utilizes the currentQuestion counter to make sure it proceeds through the questions array, as it
is updated each time this function is called. The for loop sets the buttons' texts and a dataset
attribute according to the index in the question object at the correct question in the array.
It's beautiful. It took me like 6 recreations to get it this clean.*/
function newQuestion() {
    mainEl.children[0].textContent = questions[currentQuestion].q;

    for (i = 0; i < questions[currentQuestion].options.length; i++) {

        var answer = questions[currentQuestion].options[i];
        mainEl.children[i + 1].textContent = answer;

        if (i == questions[currentQuestion].correctIndex) {
            mainEl.children[i + 1].setAttribute("data-answer","correct");
        } else {
            mainEl.children[i + 1].setAttribute("data-answer","false");
        }
    }
    currentQuestion++;
}
// Graders, thank you for all the extremely kind comments on my assignments so far LOL
// It's been a huge confidence boost. I also hope you're doing better on sleep than I am tonight WOO