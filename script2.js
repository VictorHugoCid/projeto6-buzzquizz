let quizz;
let numQuestions;
let questions;
let titles;
let count = 0;
let result = 0;
let id;

function comparador () { 
	return Math.random() - 0.5; 
}

function startQuizz(element){
    console.log("bora ver se tu é o bichão msm")
    const card = element
    //console.log(card)
    id = element.getAttribute("id")
    //console.log(id)
    callQuizz(id);
}


function callQuizz(id){

    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`)

    promise
        .catch(errorAlert)
        .then(populateQuizz)

    //console.log("entrou")    RESTART OK
}

function populateQuizz(resposta){
    quizz = resposta.data
    // console.log(quizz) RESTART OK

    plotQuizz();
}

function plotQuizz(){

    const ul = document.querySelector(".main-container")
    //console.log(ul) RESTART OK
    ul.innerHTML = ``
    ul.innerHTML += `
        <div class="questions-header">
            <div class="overlay"></div>
            <img src="${quizz.image}" alt="">
            <p>${quizz.title}</p>
        </div>
    `
    numQuestions = quizz.questions.length
    // console.log(questions) RESTART OK

    //for das perguntas
    for (let i = 0; i < numQuestions; i++) {
        let resp = "";
        quizz.questions[i].answers.sort(comparador)

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            
        const isCorrect = quizz.questions[i].answers[j].
        
        isCorrectAnswer; 
        //onsole.log(isCorrect)  RESTART OK
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
    // console.log("clicou")  RESTART OK
    const selection = element
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
    setTimeout(scrollNext, 2000)
    
}

function verifyEnd(){

    if(count === quizz.questions.length){
        plotEndQuizz();
    }

}

function calculate(){
    const selected = document.querySelectorAll(".selected-answer")
    //console.log(selected)
    let rigths = 0

    for (let i = 0; i < selected.length; i++) {
        if(selected[i].classList.contains("rigth-answer")){
            rigths++
        }
    }

    result = Math.round((rigths / Number(selected.length))*100)
    //console.log(result)
}

function plotEndQuizz(){

    calculate();
    const ul = document.querySelector(".main-container")
    //console.log(ul)

    ul.innerHTML += `
        <div class="endQuizz question">
            <div class="endQuizz-header">${result}% de acerto: Você é praticamente um aluno de Hogwarts!</div>
            <div class="endQuizz-container">
                <img src="${quizz.image}">
                <div>
                    <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão
                        abaixo para usar o vira-tempo e reiniciar este teste.</p>
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
}

function backHome(){
    const home = document.querySelector(".main-container")
    home.innerHTML +=`
    
    `
    insertUserQuizz();
    getGeneralQuizz();
}

function restartQuizz(){
    rigths = 0;
    count = 0;
    callQuizz(id);

    setTimeout(scrollRestart, 2000)
}

function scrollNext() {
    const question = document.querySelector(".questions")
    const msgNext= question.nextElementSibling
    msgNext.scrollIntoView({behavior: "smooth"});

    //SÓ TA SCROLLANDO UMA VEZ
}

function scrollRestart(){
    const question = document.querySelector(".questions-header")
    question.scrollIntoView({behavior: "smooth"});
}