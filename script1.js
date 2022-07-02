let quizzes = [];
let userQuizz = [
    {
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
    }
];

insertUserQuizz();

// GERAR A PÁGINA
// 1- USERS QUIZZES
function insertUserQuizz() {

    if (userQuizz.length !== 0) {
        console.log("tem userQuizz")
        getUserQuizz();
    } else {
        console.log("nao tem useQuizz")
        dashedBox();
    }
}

function dashedBox() {
    const ul = document.querySelector(".box-myquizzes")
    //console.log(ul)
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
    //console.log(ul)


/*   <div class="box-myquizzes"> 
        <div class="quizz-header">
            Seus Quizzes
            <ion-icon name="add-circle" onclick="createQuizzPage()"></ion-icon>
        </div>

        <div class="my-quizzes" data-identifier="user-quizzes"> 
        </div>  
    </div> */
//REEESTRUTURAÇÃO DO HTML E RIMEIRA PÁGINA


    ul.innerHTML = ``;
    for (let i = 0; i < userQuizz.length; i++) {
        const id = userQuizz[i].id;
        const img = userQuizz[i].image;
        const title = userQuizz[i].title;

        ul.innerHTML += `
            <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
                <div class="overlay"></div>
                <p>${title}</p>
                <img src="${img}" >
            </div>
        `;
    }
}


//2- GENERAL QUIZZES

getGeneralQuizz();
function getGeneralQuizz() {
    // fazer get de todos os quizzes e testar no console

    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`)
    

    promise
        .catch(errorAlert)
        .then(populateGeneralQuizz)
}

function populateGeneralQuizz(resposta) {
    quizzes = resposta.data
    //console.log(quizzes)

    plotGeneralQuizz();
}

function plotGeneralQuizz() {
    //console.log(quizzes)
    const ul = document.querySelector(".quizzes")

    //REEESTRUTURAÇÃO DO HTML E RIMEIRA PÁGINA
/*   <div class="box-quizzes">
        <div class="quizz-header">Todos os Quizzes</div>

        <div class="quizzes"data-identifier="general-quizzes>
        </div>
    </div> */

    //REEESTRUTURAÇÃO DO HTML E RIMEIRA PÁGINA




    ul.innerHTML = ``
    for (let i = 1; i < quizzes.length; i++) {

        const id = quizzes[i].id;
        const img = quizzes[i].image;
        const title = quizzes[i].title;

        ul.innerHTML += `
            <div class="quizz-card" data-identifier="quizz-card" id = "${id}" onclick="startQuizz(this)">
                <div class="overlay"></div>
                <p>${title}</p>
                <img src="${img}" >
            </div>
        `
    }

}

function errorAlert() {
    console.log(`Erroooooouuuuuu`)
}

//função q vai pra página de fazer o quizz

