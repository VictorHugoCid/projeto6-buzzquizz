let numberQuestions = 0
let numberLevels = 0
let counter = 0
let quizzTitle = ''
let object = {}
let ownQuizz = 0
let ownQuizzes = []
let SerOwnQuizzes = []
let DesOwnQuizzes = []

function checkUrl(texto) {
  try {
    let url = new URL(texto)
    return true
  } catch (err) {
    return false
  }
}

function createQuizzPage() {
  document.querySelector('.main-container').innerHTML = ''
  document.querySelector(
    '.main-container'
  ).innerHTML = `<div class="quizzCreation1">
  <h6>Comece pelo começo</h6>
  <div class="basicInformations">
    <input type="text" class="title" placeholder="Título do seu quiz" />
    <input type="text" class="url" placeholder="URL da imagem do seu quiz" />
    <input type="number" class="questionsBasic" placeholder="Quantidade de perguntas do quiz" />
    <input type="number" class="levels" placeholder="Quantidade de níveis do quizz" />
  </div>
  <button onclick="createQuestionsPage()">Prosseguir para criar perguntas</button>
</div>`
}

function createQuestionsPage() {
  let urlTester = checkUrl(document.querySelector('.url').value)
  if (
    document.querySelector('.title').value.length <= 60 &&
    document.querySelector('.title').value.length >= 20 &&
    urlTester &&
    document.querySelector('.questionsBasic').value >= 3 &&
    document.querySelector('.levels').value >= 2
  ) {
    quizzTitle = document.querySelector('.title').value
    quizzImg = document.querySelector('.url').value
    numberQuestions = document.querySelector('.questionsBasic').value
    numberLevels = document.querySelector('.levels').value

    object = { title: quizzTitle, image: quizzImg, questions: [], levels: [] }

    document.querySelector(
      '.main-container'
    ).innerHTML = `<div class="quizzCreation2">
    <h6>Crie suas perguntas</h6>
    <div class="question1">
      <div class="questionAll">
      <p>Pergunta 1</p>
      <input type="text" class="questionTitle" placeholder="Texto da pergunta" />
      <input type="text" class="color" placeholder="Cor de fundo da pergunta" />
      <p>Resposta correta</p>
      <input type="text" class="rightAnswer" placeholder="Resposta correta" />
      <input type="text" class="imgRight" placeholder="URL da imagem" />
      <p>Respostas incorretas</p>
      <input type="text" class="wrongAnswer1" placeholder="Resposta incorreta 1" />
      <input type="text" class="imgWrong1" placeholder="URL da imagem 1" />
      <input type="text" class="wrongAnswer2" placeholder="Resposta incorreta 2" />
      <input type="text" class="imgWrong2" placeholder="URL da imagem 2" />
      <input type="text" class="wrongAnswer3" placeholder="Resposta incorreta 3" />
      <input type="text" class="imgWrong3" placeholder="URL da imagem 3" />
    </div>
    <div class="miniQuestion hidden">
      <p>Pergunta 1</p>
      <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
    </div>
    </div>
    </div>
    `

    for (let i = 2; i <= numberQuestions; i++) {
      document.querySelector('.quizzCreation2').innerHTML =
        document.querySelector('.quizzCreation2').innerHTML +
        `<div class="question${i}">
      <div class="questionAll hidden">
      <p>Pergunta ${i}</p>
      <input type="text" class="questionTitle" placeholder="Texto da pergunta" />
      <input type="text" class="color" placeholder="Cor de fundo da pergunta" />
      <p>Resposta correta</p>
      <input type="text" class="rightAnswer" placeholder="Resposta correta" />
      <input type="text" class="imgRight" placeholder="URL da imagem" />
      <p>Respostas incorretas</p>
      <input type="text" class="wrongAnswer1" placeholder="Resposta incorreta 1" />
      <input type="text" class="imgWrong1" placeholder="URL da imagem 1" />
      <input type="text" class="wrongAnswer2" placeholder="Resposta incorreta 2" />
      <input type="text" class="imgWrong2" placeholder="URL da imagem 2" />
      <input type="text" class="wrongAnswer3" placeholder="Resposta incorreta 3" />
      <input type="text" class="imgWrong3" placeholder="URL da imagem 3" />
    </div>
    <div class="miniQuestion">
      <p>Pergunta ${i}</p>
      <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
    </div>
    </div>
    `
    }

    document.querySelector('.quizzCreation2').innerHTML =
      document.querySelector('.quizzCreation2').innerHTML +
      `<button onclick="createLevelsPage()">
      Prosseguir para criar níveis
    </button>`
  } else {
    alert('Dados incorretos. Favor corrigir.')
  }
}

function showQuestion(element) {
  let questions1 = document.querySelectorAll('.questionAll')
  let questions2 = document.querySelectorAll('.miniQuestion')
  for (let i = 0; i < questions1.length; i++) {
    if (questions2[i].classList.contains('hidden')) {
      questions1[i].classList.toggle('hidden')
      questions2[i].classList.toggle('hidden')
    }
  }

  let parent = element.parentNode
  let parentSibling = element.parentNode.previousElementSibling
  parent.classList.add('hidden')
  parentSibling.classList.remove('hidden')
}

function createLevelsPage() {
  for (q = 1; q <= numberQuestions; q++) {
    if (
      document.querySelector(`.question${q} .questionTitle`).value.length >=
        20 &&
      document.querySelector(`.question${q} .color`).value.length === 7 &&
      document.querySelector(`.question${q} .color`).value[0] === '#' &&
      document.querySelector(`.question${q} .rightAnswer`).value !== '' &&
      checkUrl(document.querySelector(`.question${q} .imgRight`).value) &&
      ((document.querySelector(`.question${q} .wrongAnswer1`).value !== '' &&
        checkUrl(document.querySelector(`.question${q} .imgWrong1`).value)) ||
        (document.querySelector(`.question${q} .wrongAnswer2`).value !== '' &&
          checkUrl(document.querySelector(`.question${q} .imgWrong2`).value)) ||
        (document.querySelector(`.question${q} .wrongAnswer3`).value !== '' &&
          checkUrl(document.querySelector(`.question${q} .imgWrong3`).value)))
    ) {
      counter = counter + 1

      object.questions.push({
        title: document.querySelector(`.question${q} .questionTitle`).value,
        color: document.querySelector(`.question${q} .color`).value,
        answers: [
          {
            text: document.querySelector(`.question${q} .rightAnswer`).value,
            image: document.querySelector(`.question${q} .imgRight`).value,
            isCorrectAnswer: true
          },
          {
            text: document.querySelector(`.question${q} .wrongAnswer1`).value,
            image: document.querySelector(`.question${q} .imgWrong1`).value,
            isCorrectAnswer: false
          }
        ]
      })

      if (document.querySelector(`.question${q} .wrongAnswer2`).value !== '') {
        object.questions[q - 1].answers.push({
          text: document.querySelector(`.question${q} .wrongAnswer2`).value,
          image: document.querySelector(`.question${q} .imgWrong2`).value,
          isCorrectAnswer: false
        })
      }

      if (document.querySelector(`.question${q} .wrongAnswer3`).value !== '') {
        object.questions[q - 1].answers.push({
          text: document.querySelector(`.question${q} .wrongAnswer3`).value,
          image: document.querySelector(`.question${q} .imgWrong3`).value,
          isCorrectAnswer: false
        })
      }
    }
  }

  if (counter === Number(numberQuestions)) {
    document.querySelector(
      '.main-container'
    ).innerHTML = `<div class="quizzCreation3">
    <h6>Agora, decida os níveis</h6>
    <div class="level1">
      <div class="levelAll">
      <p>Nível 1</p>
      <input type="text" class="title" placeholder="Título do nível" />
      <input type="number" class="percentage" placeholder="% de acerto mínima" />
      <input type="text" class="imgLevel1" placeholder="URL da imagem do nível" />
      <input type="text" class="description" placeholder="Descrição do nível" />
      </div>
    <div class="miniLevel hidden">
      <p>Nível 1</p>
      <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
    </div>
    </div>
    `

    for (let i = 2; i <= numberLevels; i++) {
      document.querySelector('.quizzCreation3').innerHTML =
        document.querySelector('.quizzCreation3').innerHTML +
        `<div class="level${i}">
        <div class="levelAll hidden">
        <p>Nível ${i}</p>
        <input type="text" class="title" placeholder="Título do nível" />
        <input type="number" class="percentage" placeholder="% de acerto mínima" />
        <input type="text" class="imgLevel${i}" placeholder="URL da imagem do nível" />
        <input type="text" class="description" placeholder="Descrição do nível" />
        </div>
      <div class="miniLevel">
        <p>Nível ${i}</p>
        <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
      </div>`
    }

    document.querySelector('.quizzCreation3').innerHTML =
      document.querySelector('.quizzCreation3').innerHTML +
      `<button onclick="sucessPage()">
  Finalizar quizz
</button>`
  } else {
    alert('Dados incorretos. Favor corrigir.')
    counter = 0
    object.questions = []
  }
}

function showLevel(element) {
  let levels1 = document.querySelectorAll('.levelAll')
  let levels2 = document.querySelectorAll('.miniLevel')
  for (let i = 0; i < levels1.length; i++) {
    if (levels2[i].classList.contains('hidden')) {
      levels1[i].classList.toggle('hidden')
      levels2[i].classList.toggle('hidden')
    }
  }

  let parent = element.parentNode
  let parentSibling = element.parentNode.previousElementSibling
  parent.classList.add('hidden')
  parentSibling.classList.remove('hidden')
}

let test = false
function sucessPage() {
  counter = 0
  for (q = 1; q <= numberLevels; q++) {
    if (
      document.querySelector(`.level${q} .title`).value.length >= 10 &&
      document.querySelector(`.level${q} .percentage`).value >= 0 &&
      document.querySelector(`.level${q} .percentage`).value <= 100 &&
      document.querySelector(`.level${q} .description`).value.length >= 30
    ) {
      counter = counter + 1
      object.levels.push({
        title: document.querySelector(`.level${q} .title`).value,
        image: document.querySelector(`.level${q} .imgLevel${q}`).value,
        text: document.querySelector(`.level${q} .description`).value,
        minValue: Number(document.querySelector(`.level${q} .percentage`).value)
      })
    }
  }

  for (s = 1; s <= numberLevels; s++) {
    if (Number(document.querySelector(`.level${s} .percentage`).value) === 0) {
      test = true
      s = numberLevels + 1
    }
  }

  if (counter === Number(numberLevels) && test) {
    document.querySelector('.main-container').innerHTML = `
    <div class="quizzCreation4">
      <h6>Seu quizz está pronto!</h6>

      <div class="imgWrapper">
        <img
          src="${quizzImg}"
          alt=""
        />
        <div class="gradient"></div>
        <p>${quizzTitle}</p>
      </div>

      <button onclick="callQuizz(ownQuizz)">Acessar Quizz</button>

      <button class="homeButton" onclick="backHome()">Voltar pra home</button>
    </div>  
    `

    let promise = axios.post(
      'https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes',
      object
    )
    promise.then(saveUserQuizz)
  } else {
    alert('Dados incorretos. Favor corrigir.')
    counter = 0
    test = false
  }
}

function saveUserQuizz(objectId) {
  console.log('Agora foi')
  SerOwnQuizzes = localStorage.getItem('UserQuizzesIds')
  DesOwnQuizzes = JSON.parse(SerOwnQuizzes)

  if (DesOwnQuizzes !== null) {
    ownQuizz = objectId.data.id
    DesOwnQuizzes.push(ownQuizz)
    localStorage.removeItem('UserQuizzesIds')
    SerOwnQuizzes = JSON.stringify(DesOwnQuizzes)
    localStorage.setItem('UserQuizzesIds', SerOwnQuizzes)
  } else {
    DesOwnQuizzes = []

    ownQuizz = objectId.data.id
    DesOwnQuizzes.push(ownQuizz)
    SerOwnQuizzes = JSON.stringify(DesOwnQuizzes)
    localStorage.setItem('UserQuizzesIds', SerOwnQuizzes)
  }

  giveUserQuizz()
  insertUserQuizz()
}

function giveUserQuizz() {
  let SerOwnQuizzes = localStorage.getItem('UserQuizzesIds')
  userQuizzId = JSON.parse(SerOwnQuizzes)
}
