let quizzes = []
let userQuizzes = []
let generalCards
let userCards
let userQuizzId = []
let arrayUser = []
plotHTML();
// GERAR A PÁGINA
// 1- USERS QUIZZES

function plotHTML() {
  setTimeout(window.scrollTo({ top: 0, behavior: 'smooth' }))
  const ul = document.querySelector('.main-container')
  ul.innerHTML = ``

  ul.innerHTML += `
        <div class="box-myquizzes">
            <div class="quizz-header">Seus Quizzes
                <ion-icon name="add-circle" onclick="createQuizzPage()"></ion-icon>
            </div>
            <div class="my-quizzes" data-identifier="user-quizzes">
            </div>
        </div>
        
        <div class="box-quizzes">
            <div class="quizz-header">Todos os Quizzes</div>

            <div class="quizzes" data-identifier="general-quizzes">
            </div>
        </div>`

  insertUserQuizz()
  getGeneralQuizz()
}

function insertUserQuizz() {

  if (localStorage.getItem("UserQuizzesIds") === null) {
    userQuizzId = [];
  } else {
    userQuizzId = JSON.parse(localStorage.getItem("UserQuizzesIds"));
  }
  
  if (userQuizzId.length !== 0) {
    //console.log('tem user quizz')
    getUserQuizz()
  } else {
    //console.log('nao tem user quizz')

    dashedBox()
  }
}

function dashedBox() {

  const ul = document.querySelector('.box-myquizzes')
  ul.innerHTML = ``
  ul.innerHTML += `
        <div class="dashed-box">
            <p>Você não criou nenhum quizz ainda :)</p>
            <div class="addQuizz" onclick="createQuizzPage()">
                Criar Quizz
            </div>
        </div>
        `
}

function getUserQuizz() {
  for (let i = 0; i < userQuizzId.length; i++) {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${userQuizzId[i]}`
    )
    promise.then(plotUserQuizz)

  }
}

function plotUserQuizz(resposta) {

  const ul = document.querySelector('.my-quizzes')
 
  const id = resposta.data.id
  const img = resposta.data.image
  const title = resposta.data.title
  
  ul.innerHTML += `
          <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
              <div class="overlay"></div>
              <p>${title}</p>
              <img src="${img}">
          </div>
      `

}

//2- GENERAL QUIZZES
function getGeneralQuizz() {
  const promise = axios.get(
    `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`
  )
  promise.catch(errorAlert).then(populateGeneralQuizz)
}

function populateGeneralQuizz(resposta) {
  quizzes = resposta.data

  plotGeneralQuizz()
}

function plotGeneralQuizz() {
  generalCards = ''
  for (let i = 1; i < quizzes.length; i++) {
    const id = quizzes[i].id
    const img = quizzes[i].image
    const title = quizzes[i].title
    generalCards += `
            <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
                <div class="overlay"></div>
                <p>${title}</p>
                <img src="${img}" >
            </div>
        `
  }

  const ul = document.querySelector('.quizzes')
  ul.innerHTML = ``

  ul.innerHTML += `
        ${generalCards}
    `
}

function errorAlert() {
  console.log(`Erroooooouuuuuu`)
}
