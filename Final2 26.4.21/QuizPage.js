let modal = document.getElementById("myModal");
let modal_body = document.getElementsByClassName("modal-body")[0];
let span = document.getElementsByClassName("close")[0];
let start_game = document.getElementsByClassName("starttheGame")[0];
let audio_place = document.getElementsByClassName("audioFile")[0];
let question_place = document.getElementsByClassName("question")[0];
let answers_place = document.getElementsByClassName("option");
let main = document.getElementsByClassName("main")[0];
let start = document.getElementsByClassName("start")[0];
let rightWrong = document.getElementsByClassName("rightWrong")[0];
let hint_button = document.getElementById("hinter");
let hintSpace = document.getElementById("hintSpace");
let giveHint = document.getElementsByClassName("giveHint")[0];
let endWindow = document.getElementsByClassName("endResult")[0];
let score_place = document.getElementById("score");
let health = document.getElementById('health'); 
let timeLeftDisplay = document.querySelector('.timer');
let timeLeft = 60;
let round = 0;
let score = 0;
let index = 0;

main.style.opacity = 0;
//setting questions,audios,options,answers,hints
let questions = [
    {
        sound: "Q1.mp3",
        option1: "Scarface",
        option2: "Say Hello",
        option3: "Bad Friend",
        option4: "Pretty Little Liars",
        answer: "Scarface",
        hint: "I'm Tony Montana"
    },
    {
        sound: "Q2.mp3",
        option1: "Bruno",
        option2: "Made in the USA",
        option3: "Borat",
        option4: "The dictator",
        answer: "Borat",
        hint: "I like you. I like sex, VERY much!"
    },
    {
        sound: "Q3.mp3",
        option1: "Meet The Focker",
        option2: "Hangover",
        option3: "When Harry Met Sally",
        option4: "Wedding Crashers",
        answer: "Hangover",
        hint: "So long, gay boys!"
    },
    {
        sound: "Q4.mp3",
        option1: "X-Men",
        option2: "Harry Potter",
        option3: "Titanic",
        option4: "The Lord of the Rings",
        answer: "The Lord of the Rings",
        hint: "my precious"
    },  
    {
        sound: "Q5.mp3",
        option1: "James Bond",
        option2: "Shrek",
        option3: "Jurassic Park",
        option4: "Pulp Fiction",
        answer: "James Bond",
        hint: "007"
    }
];

let keys = Object.keys(questions[0]);

function appendAudio(link){
    //adding link of audio
    let created_source = document.createElement("source");
    created_source.setAttribute("src",link);
    created_source.setAttribute("type","audio/ogg");
    //creating audio tag window
    let created_audio = document.createElement("audio");
    created_audio.setAttribute("controls",'');
    //appening to HTML
    created_audio.appendChild(created_source);
    //if there is an audio already, replace it
    if (round == 0){
        audio_place.appendChild(created_audio);
    } else {
        audio_place.replaceChild(created_audio,audio_place.children[0]);
    }
}

function popAnswer(){
    //toggling the correct or mistake for user
    rightWrong.classList.toggle("show");
    //clearing the display
    setTimeout(function(){
        rightWrong.innerHTML='';
        rightWrong.style.backgroundColor = '#f7b500ab';
    },1500);
}
Array.from(answers_place).forEach((ap) => {
    //adding event listener to each option
    ap.addEventListener('click',function(){
        ap.style.backgroundColor = 'rgba(97, 97, 97, 0.726)';
        ap.style.color = 'cornsilk';
        ap.style.border = '2px solid rgb(27, 27, 27)';
        ap.style.boxShadow = 'none';
        ap.addEventListener('mouseover',function(e){
           e.target.style.border = 'none';
           e.target.style.color = 'black';
           ap.style.backgroundColor = '#FFC107';
        });
        ap.addEventListener('mouseout',function(e){
            e.target.style.backgroundColor = 'rgba(97, 97, 97, 0.726)';
            e.target.style.color = 'cornsilk';
            e.target.style.border = '2px solid rgb(27, 27, 27)';
            e.target.style.boxShadow = 'none';
         });
        if(round<questions.length){
            //If correct
            if(ap.innerHTML == questions[index-1].answer){
                score += 100;
                score_place.innerHTML = score;
                rightWrong.innerHTML = "Applause!";
                rightWrong.style.backgroundColor = "rgb(106, 226, 41,0.7)";
                popAnswer();
                // if Wrong
            } else {
                rightWrong.innerHTML = "Rotten Tomatoes";
                popAnswer();
                health.value -= 1;
                rightWrong.style.backgroundColor = 'rgb(188, 54, 0, 0.7)';
                if(health.value == 0){
                    gameOver(score);
                }
            }
        } else {
            gameOver(score+200);
        }
        nextquestion();
    })
})

function nextquestion(){   
    let qst = questions[index];
    if(index < questions.length-1){
        index +=1; 
    }
    //adding the currect audio
    appendAudio(qst.sound);
    //appending right answers
    for (let i=0;i<4;i++){
        let obj_place = keys[i+1];
        answers_place[i].innerHTML = qst[obj_place];
    }
    //counting rounds for appendAudio function
    round +=1;
}
                
// Remove Start button
start.addEventListener('click',function(){
    start_game.removeChild(start_game.children[0]);
    // start countdown
    countDown();
    main.style.opacity = 1;
    //setting new question
    nextquestion();
})
                   
function gameOver(s){
    main.style.opacity = 0;
    //pushing the end popup window
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    modal_body.innerHTML = `Thanks For playing!
    Your score is: ${s}`;
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//setting countdown
function countDown() {
    setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timeLeft = 0);
            gameOver(score);
        }
        timeLeftDisplay.innerHTML = "TIME: " + timeLeft;
        timeLeft -= 1;        
    }, 1100);
}
var popup = document.getElementById("myPopup");

//giving hint
function myFunction() {
    popup.classList.toggle("show");
    if (popup.style.display == 'none'){
        popup.style.display = 'block';
    }
    popup.innerHTML = questions[index-1].hint;
    //this is timer for pop up to disapper
    if (popup.style.display == 'block'){
        popup.style.display = 'none';
    } 
}