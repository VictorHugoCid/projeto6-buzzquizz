

let quizzes = [];
let generalCards;
let userCards;
let userQuizz = [
    /* {
        id: 1,
        title: "Título do quizz",
        image: "https://http.cat/411.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    },

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    {
        id: 1111,
        title: "Título do quizz",
        image: "https://http.cat/412.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    } */
];

plotHTML();

// GERAR A PÁGINA
// 1- USERS QUIZZES

function plotHTML(){
    setTimeout(window.scrollTo({top: 0, behavior: "smooth"}))
    const ul = document.querySelector(".main-container")
    ul.innerHTML = ``

    ul.innerHTML +=`
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

        insertUserQuizz();
        getGeneralQuizz();
}

 function insertUserQuizz() {

    if (userQuizz.length !== 0) {
        getUserQuizz();
    } else {
        dashedBox();
    }
}

function dashedBox() {
    const ul = document.querySelector(".box-myquizzes")
    ul.innerHTML = ``
    ul.innerHTML += `
        <div class="dashed-box">
            <p>Você não criou nenhum quizz ainda :)</p>
            <div class="addQuizz" onclick="createQuizzPage()">
                Criar Quizz
            </div>
        </div>
        `;
}

function getUserQuizz() {
    const ul = document.querySelector(".my-quizzes")

    ul.innerHTML = ``;
    for (let i = 0; i < userQuizz.length; i++) {
        const id = userQuizz[i].id;
        const img = userQuizz[i].image;
        const title = userQuizz[i].title;

        ul.innerHTML += `
            <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
                <div class="overlay"></div>
                <p>${title}</p>
                <img src="${img}">
            </div>
        `;
    }
}

//2- GENERAL QUIZZES
function getGeneralQuizz() {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`)
    promise
        .catch(errorAlert)
        .then(populateGeneralQuizz)
}

function populateGeneralQuizz(resposta) {
    quizzes = resposta.data

    plotGeneralQuizz();
}

function plotGeneralQuizz() {
    generalCards = ""
    for (let i = 1; i < quizzes.length; i++) {
        
        const id = quizzes[i].id;
        const img = quizzes[i].image;
        const title = quizzes[i].title;
        generalCards += `
            <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
                <div class="overlay"></div>
                <p>${title}</p>
                <img src="${img}" >
            </div>
        `
    }

    const ul = document.querySelector(".quizzes")
    ul.innerHTML = ``

    ul.innerHTML += `
        ${generalCards}
    `
}

function errorAlert() {
    console.log(`Erroooooouuuuuu`)
}


