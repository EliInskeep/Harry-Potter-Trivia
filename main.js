const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: `Where does Harry go to teach Dumbledore's Army?`,
        choice1: 'Room of Necessity',
        choice2: 'Room of Requirement',
        choice3: 'Hogsmeade',
        choice4: 'Room of Requisition',
        answer: 2,
    },
    {
        question: `Who was believed to originally possess the Deathly Hallows?`,
        choice1: 'Albus Dumbledore',
        choice2: 'Gellert Grindelwald',
        choice3: 'The Peverell brothers',
        choice4: 'Godric Gryffindor',
        answer: 3,
    },
    {
        question: `Who was the Hogwarts headmaster before Albus Dumbledore?`,
        choice1: 'Nicholas Flamel',
        choice2: 'Phineas Nigellus',
        choice3: 'Rufus Scrimgeour',
        choice4: 'Armando Dippet',
        answer: 4,
    },
    {
        question: `Ron Weasley begins vomiting slugs after coming to whose defense in Harry Potter and the Chamber of Secrets?`,
        choice1: 'Ginny',
        choice2: 'Harry',
        choice3: 'Hermoine',
        choice4: 'Neville',
        answer: 3,
    },
    {
        question: `Which department does Arthur Weasley work for at the Ministry of Magic?`,
        choice1: 'Misuse of Muggle Artifacts Office',
        choice2: 'Department of Mysteries',
        choice3: 'Muggle Liaison Office',
        choice4: 'Department of Magical Accidents and Catastrophes',
        answer: 1,
    },
    {
        question: `Where is the Slytherin common room located?`,
        choice1: 'The Dungeons',
        choice2: 'In the West Tower',
        choice3: 'Next to the kitchens',
        choice4: 'Below the Great Hall',
        answer: 1,
    },
    {
        question: `Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?`,
        choice1: 'Hippogriffs',
        choice2: 'Thestrals',
        choice3: 'Centaurs',
        choice4: 'Manticores',
        answer: 2,
    },
    {
        question: `What is Hermoine's patronus?`,
        choice1: 'Siberian Cat',
        choice2: 'Rabbit',
        choice3: 'Otter',
        choice4: 'Whitetail Deer',
        answer: 3,
    },
    {
        question: `How many Weasley siblings are there?`,
        choice1: 'Five',
        choice2: 'Eight',
        choice3: 'Four',
        choice4: 'Seven',
        answer: 4,
    },
    {
        question: `What do Hermione's muggle parents do for a living?`,
        choice1: 'Doctors',
        choice2: 'Realtors',
        choice3: 'Pharmacists',
        choice4: 'Dentists',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()