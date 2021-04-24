var modal = document.getElementById("myModal");
var modal_body = document.getElementsByClassName("modal-body")[0];
let start_game = document.getElementsByClassName("starttheGame")[0];
var span = document.getElementsByClassName("close")[0];
let audio_place = document.getElementsByClassName("audioFile")[0];
let question_place = document.getElementsByClassName("question")[0];
let answers_place = document.getElementsByClassName("option");
let main = document.getElementsByClassName("main")[0];
let next = document.getElementsByClassName("start")[0];
let start = document.getElementsByClassName("start")[0];
let rightWrong = document.getElementsByClassName("rightWrong")[0];
let hint_button = document.getElementById("hinter");
let hintSpace = document.getElementById("hintSpace");
let giveHint = document.getElementsByClassName("giveHint")[0];
let endWindow = document.getElementsByClassName("endResult")[0];
let score_place = document.getElementById("score");
let health = document.getElementById('health'); 
const timeLeftDisplay = document.querySelector('.timer');
let timeLeft;
let round = 0;
let score = 0;
let index = 0;
let correct;
let hints_taken = 0;
main.style.opacity = 0;

let questions = [
    {
        sound: "Elephant.mp3",
        option1: "This",
        option2: "is",
        option3: "first",
        option4: "result",
        answer: "this",
        hint: "starts with t"
    },
    {
        sound: "Tiger.mp3",
        option1: "this",
        option2: "is",
        option3: "second",
        option4: "result",
        answer: "this",
        hint: "last letter s"
    },
    {
        sound: "burekas.mp3",
        option1: "this",
        option2: "is",
        option3: "third",
        option4: "result",
        answer: "this",
        hint: "first one"
    },
    {
        sound: "claps.mp3",
        option1: "this",
        option2: "is",
        option3: "fourth",
        option4: "result",
        answer: "this",
        hint: "yellow"
    },
    {
        sound: "burekas.mp3",
        option1: "this",
        option2: "is",
        option3: "fifth",
        option4: "result",
        answer: "this",
        hint: "under audio"
    },
    {
        sound: "Elephant.mp3",
        option1: "this",
        option2: "is",
        option3: "sixth",
        option4: "result",
        answer: "this",
        hint: "starts with t"
    },
    {
        sound: "Elephant.mp3",
        option1: "this",
        option2: "is",
        option3: "seventh",
        option4: "result",
        answer: "this",
        hint: "starts with t"
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
    },2000);
}

Array.from(answers_place).forEach((ap) => {
    //adding event listener to each option
    ap.addEventListener('click',function(){
        if(round<questions.length+1){
            if(ap.innerHTML == questions[index].answer){
                score += 100;
                score_place.innerHTML = score;
                rightWrong.innerHTML = "Correct";
                popAnswer();
            } else {
                rightWrong.innerHTML = "False";
                popAnswer();
                health.value -= 1;
                if(health.value == 0){
                gameOver(score)
            }
        }
        } else {
            gameOver(score+100);
        }
    })
}); 

function nextquestion(){   
    let qst = questions[index];
    //getting index forward
    if(index < questions.length-1){
        index +=1; 
    }
    //appendig audio
    appendAudio(qst.sound);
    //placing options
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
    countDown();
    main.style.opacity = 1;
    nextquestion();
})
                
//hint giver 
hint_button.addEventListener('click',function(){
    hintSpace.innerHTML = questions[index].hint;
    hintSpace.classList.toggle("show");
    score -=30;
    // hints_taken +=1;
    setTimeout(function(){
        hintSpace.innerHTML='';
    },5000);
})
                
function gameOver(s){
    //pushing the end popup window
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    modal_body.innerHTML = `You have got ${s} Point`;
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    main.style.opacity = 0;
}

//setting countdown
timeLeft = 60;     
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