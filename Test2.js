function countDown() {
    timeLeft = 60;     
    setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timeLeft = 0);
            gameOver(score);
        }
        timeLeftDisplay.innerHTML = "TIME: " + timeLeft;
        timeLeft -= 1;
    }, 1000);
}