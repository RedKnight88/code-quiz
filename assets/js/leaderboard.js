var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");
var listEl = document.querySelector("#leaderboard");

goBackBtn.addEventListener("click", function() {
    window.open("./index.html","_self")
})

clearScoresBtn.addEventListener("click", function() {
    localStorage.removeItem("Leaderboard");
    var listArray = listEl.children;
    for (i = listArray.length - 1; i >= 0; i--) {
        listEl.removeChild(listArray[i]);
    }
})

// render item list of all scores in local storage
const leaderArray = JSON.parse(localStorage.getItem("Leaderboard"));
// sorting algo?
if (leaderArray != null) {
    for (i = 0; i < leaderArray.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = leaderArray[i].initials + " - " + leaderArray[i].score;
        listEl.appendChild(listItem);
    }
}