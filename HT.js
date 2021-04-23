// RAZ until line 90

let audio_place = document.getElementsByClassName("audioFile")[0];
let question_place = document.getElementsByClassName("question")[0];
let answers_place = document.getElementsByClassName("option");
let main = document.getElementsByClassName("main")[0];
let next = document.getElementsByClassName("start")[0];

let scores = 0;
let index = 0;
let questions = [{
        sound: "Elephant.mp3",
        option1: "AA",
        option2: "BB",
        option3: "CC",
        option4: "DD",
        answer: "BB"
    },
    {
        sound: "Tiger.mp3",
        option1: "QQ",
        option2: "WW",
        option3: "XX",
        option4: "YY",
        answer: "QQ"
    }
];
// let qst = questions[index];
// let keys = Object.keys(qst)

function appendAudio(link) {
    let created_audio = document.createElement("audio");
    created_audio.setAttribute("controls", '');
    let created_source = document.createElement("source");
    created_source.setAttribute("src", link);
    created_source.setAttribute("type", "audio/ogg");
    created_audio.appendChild(created_source);
    audio_place.appendChild(created_audio);
}

function setOptions() {
    for (let i = 0; i < 4; i++) {
        let obj_place = keys[i + 1];
        answers_place[i].innerHTML = qst[obj_place];
    }
}

function getAnswer() {
    for (ap of answers_place) {
        ap.addEventListener("click", function (e) {
            if (qst.answer == e.target.innerHTML) {
                this.style.backgroundColor = "green";
                scores += 100;
                index += 1;
            } else {
                this.style.backgroundColor = "red";
                index += 1;
            }
        })
    }
}

for (let j = 0; j < questions.length; j++) {
    let qst = questions[j];
    let keys = Object.keys(qst);

    appendAudio(qst.sound);


    for (ap of answers_place) {

        ap.addEventListener("click", function (e) {
            for (let i = 0; i < 4; i++) {
                let obj_place = keys[i + 1];
                answers_place[i].innerHTML = qst[obj_place];
            }
            if (qst.answer == e.target.innerHTML) {
                this.style.backgroundColor = "green";
                scores += 100;
                index += 1;
            } else {
                this.style.backgroundColor = "red";
                index += 1;
            }
        })
    }

    // console.log(qst.sound);
}
// RAZ

// SHY  until line 122
var myscore = document.getElementById('next');
var zero = document.getElementById('counter');
myscore.addEventListener('click', myfunction)

function myfunction() {
    zero.innerHTML = +(zero.innerHTML) + 100;
}

// timer:
document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('.timer')
    const startBtn = document.querySelector('.button')
    let timeLeft = 60

    function countDown() {

        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0);
            }
            timeLeftDisplay.innerHTML = "TIME: " + timeLeft;
            timeLeft -= 1;
        }, 1000);

    }
    startBtn.addEventListener('click', countDown);

})

// shy