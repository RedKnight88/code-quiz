/* This script is simply a storage of my array of question objects, in order to not clutter the main
script file, and to test around with objects without potentially breaking the main script.
The questions are each an object, containing information about each question: what is the
text to communicate the question, what are the multiple choice answers, and which answer
is correct (index of options array that holds the correct answer).
Each question is then put into an array to be utilized in the main script (see: newQuestion()).
*/

const q1 = {
    q: "String values must be enclosed within ___ when being associated to variables",
    options: ["quotes","curly brackes","commas","parenthesis",],
    correctIndex: 0, 
}

const q2 = {
    q: "Commonly used data types do NOT include:",
    options: ["strings","booleans","alerts","numbers",],
    correctIndex: 2, 
}

const q3 = {
    q: "The condition in an if / else statement is enclosed with ___.",
    options: ["quotes","curly brackets","parenthesis","square brackets",],
    correctIndex: 2, 
}

const q4 = {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript","terminal / bash","for loops","console.log",],
    correctIndex: 3, 
}

const q5 = {
    q: "Arrays in Javascript can be used to store ___.",
    options: ["numbers and strings","booleans","other arrays","all of the above",],
    correctIndex: 3, 
}

const questions = [q1,q2,q3,q4,q5];