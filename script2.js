let quizz;
let numQuestions;
let questions;
let titles;
let count = 0;
let result = 0;
let id;
let indexNivel;
let aux;



function comparador () { 
	return Math.random() - 0.5; 
}

function startQuizz(element){
    console.log("bora ver se tu é o bichão msm")
    const card = element
    id = element.getAttribute("id")
    callQuizz(id);
}

function callQuizz(id){

    setTimeout(window.scrollTo({top: 0, behavior: "smooth"}))
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`)

    promise
        .catch(errorAlert)
        .then(populateQuizz)

}

function populateQuizz(resposta){
    quizz = resposta.data

    plotQuizz();
}

function plotQuizz(){

    const ul = document.querySelector(".main-container")
    ul.innerHTML = ``
    ul.innerHTML += `
        <div class="questions-header">
            <div class="overlay"></div>
            <img src="${quizz.image}" alt="">
            <p>${quizz.title}</p>
        </div>
    `
    numQuestions = quizz.questions.length

    for (let i = 0; i < numQuestions; i++) {
        let resp = "";
        quizz.questions[i].answers.sort(comparador)

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            
        const isCorrect = quizz.questions[i].answers[j].isCorrectAnswer; 

        let situation;

        if(isCorrect){
            situation = "rigth-answer";
        }else{
            situation = "wrong-answer";
        }
            
            resp += `
                <div class="question-item ${situation} hidden-answer" onclick="answerSelection(this)">
                    <img src="${quizz.questions[i].answers[j].image}">
                    <p>${quizz.questions[i].answers[j].text}</p>
                </div> 
            `
        }

        ul.innerHTML +=`
            <div class="questions">
                <div class="question-title" style="background-color:${quizz.questions[i].color};">
                ${quizz.questions[i].title}
                </div>
                    <div class="box-questionImg">
                        ${resp}
                        
                    </div>
                </div>
            </div>

        `        
    }
}

function answerSelection(element){

    const selection = element
    const answers = selection.parentNode
    const questionsBox = answers.parentNode

    const array = answers.querySelectorAll(".question-item")


    let bolinha = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i].classList.contains("selected-answer")){
            bolinha++
        }
    }

    if(bolinha !== 0){
        return;
    }

    selection.classList.add("selected-answer")

    const boxQuestion = element.parentNode
    const allAnswers = boxQuestion.querySelectorAll(".question-item")

    for (let i = 0; i < allAnswers.length; i++) {
        allAnswers[i].style.opacity = "0.5";
        allAnswers[i].classList.remove("hidden-answer")
    }

    selection.style.opacity = "1";

    count++

    verifyEnd();

    scrollNext(questionsBox)
    
}

function calculate(){

    const selected = document.querySelectorAll(".selected-answer")
    let rigths = 0

    for (let i = 0; i < selected.length; i++) {
        if(selected[i].classList.contains("rigth-answer")){
            rigths++
        }
    }
    result = Math.round((rigths / Number(selected.length))*100)


    calcNivel();
}

function calcNivel(){

    let arr =[];
    
    for (let i = 0; i < quizz.levels.length; i++) {
        arr.push(quizz.levels[i].minValue)
    }
    arr.sort()

    for (let i = 0; i < arr.length; i++) {
        if(result >= arr[i]){
            aux = arr[i]
        }
    }

    for (let i = 0; i < quizz.levels.length; i++) {
        if(aux === quizz.levels[i].minValue){

            indexNivel = i 
        }
    }
}

function plotEndQuizz(){
    calculate();

    let title = quizz.levels[indexNivel].title
    let image = quizz.levels[indexNivel].image
    let text = quizz.levels[indexNivel].text

    const ul = document.querySelector(".main-container")

    ul.innerHTML += `
        <div class="endQuizz question">
            <div class="endQuizz-header">${result}% de acerto: ${title}</div>
            <div class="endQuizz-container">
                <img src="${image}">
                <div>
                    <p>${text}</p>
                </div>
            </div>
        </div>
        <div class="restartQuizz" onclick = "restartQuizz()">
            Reiniciar Quizz
        </div>

        <div class="home-endQuizz" onclick="backHome()">
            Voltar pra home
        </div>
    `

    setTimeout(function(){
        document.querySelector(".endQuizz-container").scrollIntoView({block:"center", behavior: "smooth"})
    }, 2000)
}

function backHome(){
    rigths = 0;
    count = 0;
    const home = document.querySelector(".main-container")
    home.innerHTML +=`
    `
    plotHTML();
}

function restartQuizz(){
    rigths = 0;
    count = 0;
    
    callQuizz(id);
}

function scrollNext(questionsBox) {

    const allQuestions = document.querySelectorAll(".questions")

    for (let i = 0; i < allQuestions.length; i++) {
        if (questionsBox === allQuestions[allQuestions.length-1]){
            return;
        }
        if(questionsBox === allQuestions[i]){
            setTimeout(function (){
                allQuestions[i+1].scrollIntoView({block: "center", behavior: "smooth", inline: 'center'})
            }, 2000)
        }
    }

}


function verifyEnd(){

    if(count === quizz.questions.length){
        plotEndQuizz();
    }

}