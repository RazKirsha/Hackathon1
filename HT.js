//rony: HP bar
health = document.getElementById('health'); 
// var for loosing health
const loseHp = document.getElementById('loseHp');
// extra: var if we want to give and extra life that adds health
// const addHp = document.getElementById('addHp'); 

// This is the event listener, it is setup to link event from html by clicking button - 
// we switch the eventL once we have it to change with wrong question
loseHp.addEventListener('click', () => { health.value -= 1; va()});
// if we use extra life:
// addHp.addEventListener('click', () => { health.value += 1; va()});

// extra: function if we want to display numerical value of amount of lifes
// function va() {
// document.getElementById('val').innerHTML = health.value;
// }
// va()
//-----------------

// Raz: questions/answers/quiz
let audio_place = document.getElementsByClassName("audioFile")[0];
let question_place = document.getElementsByClassName("question")[0];
let answers_place = document.getElementsByClassName("option");
let main = document.getElementsByClassName("main")[0];
let next = document.getElementsByClassName("start")[0];
let start = document.getElementsByClassName("start")[0];
let round = 0;
let scores = 0;
let index = 0;
let correct;
let questions = [
    {
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

function appendAudio(link){
    let created_source = document.createElement("source");
    created_source.setAttribute("src",link);
    created_source.setAttribute("type","audio/ogg");
    let created_audio = document.createElement("audio");
    created_audio.setAttribute("controls",'');
    created_audio.appendChild(created_source);
    if (round == 0){
        audio_place.appendChild(created_audio);
    } else {
    audio_place.replaceChild(created_audio,audio_place.children[0]);
    // console.log(audio_place.children[0]);
    }
}

function getAnswer(){
    Array.from(answers_place).forEach((ap) => {
        console.log(ap.innerHTML);
        ap.addEventListener('click',function(e){
            console.log(e.target.innerHTML);
            nextquestion();
        })
    });   
}

let keys = Object.keys(questions[0])

function nextquestion(){
// clock.innerHTML = time
    let qst = questions[index];
    console.log(qst);
    // getAnswer(answers_place,qst);
    //Appending Audio File
    appendAudio(qst.sound);
    //get answer from user
    //Appending options
    for (let i=0;i<4;i++){
        let obj_place = keys[i+1];
        answers_place[i].innerHTML = qst[obj_place];
    }
    // console.log(getAnswer(answers_place,qst));
    index +=1; 
    round +=1;
}


start.addEventListener('click',function(){
    main.removeChild(main.children[0]);
    nextquestion();
})

// setTimeout(nextquestion,5000);