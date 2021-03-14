const startBtn = document.querySelector('#start');
const timerEl = document.querySelector('.right-span');
const viewHighscoresEl = document.querySelector('.left-span');
const mainEl = document.querySelector('main');
const h1El = document.querySelector('main > h1');
const textEl = document.querySelector('.description > p');

const questionsArray = [
    {
        question: 'How to completely delete an item from array?',
        answers: ['splice()', 'delete()', 'pop()', 'push()'],
        correctAnswer: 'delete()'
    },
    {
        question: 'Is HTML a programming language?',
        answers: ['Yes', 'No'],
        correctAnswer: 'No'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['Javascript', 'terminal/bash', 'for loops', 'console.log()'],
        correctAnswer: 'console.log()'
    }
];

let timerCount = 75;
let questionNumber = 0;
let score = 0;
let currentCorrectAnswer = 'correctAnswer';
let userAnswer = 'userAnswer';
let stopTimer = false;

//Main functions run here
startBtn.addEventListener('click', function () {
    startQuiz(timerEl);
    display1Question();
});

viewHighscoresEl.addEventListener('click', function(){
    //remove start button
    startBtn.remove();
    //removed default p element, no need anymore
    textEl.remove();
    h1El.remove();
    if(document.querySelector('.centerItems') !== null)
    document.querySelector('.centerItems').remove();

    createHighScoreBox();
})

//Sets timer at 75 seconds, removes 'Start' button, displays questions
function startQuiz(element) {
    //remove start button
    startBtn.remove();
    //removed default p element, no need anymore
    textEl.remove();

    var timerInterval = setInterval(function () {
        timerCount--;
        element.textContent = `Time: ${timerCount}`;
        timerEl.style.backgroundColor = 'transparent';
        if (timerCount === 0 || stopTimer) {
            clearInterval(timerInterval);
        }
    }, 1000);
};

//displays 1 question and increments "questionNumber"
function display1Question() {
    let each = questionsArray[questionNumber];
    currentCorrectAnswer = each.correctAnswer;

    //display the question
    h1El.textContent = each.question;

    let count = 0;

    //create answer buttons box
    let btnDiv = document.createElement('div');
    btnDiv.classList.add('answers-list')

    //display all the options of answers
    //1. create an element
    each.answers.forEach(function (eachAnswer) {
        let ans = document.createElement('button');

        //using dataSet to display order numbers
        ans.setAttribute('data-order', count);
        count++;

        ans.setAttribute('data-selected', 'not selected');

        ans.textContent = `${count}. ${eachAnswer}`;
        ans.style.padding = '5px 10px';
        ans.style.width = '200px';
        ans.style.margin = '5px auto auto';
        ans.style.textAlign = 'left';

        btnDiv.appendChild(ans);
    });

    mainEl.appendChild(btnDiv);
    questionNumber++;
    checkUserAnswer();
}

//Gets user selection and marks currentCorrectAnswer with answered value
function checkUserAnswer() {
    let main = document.querySelector('.answers-list');

    if (document.querySelector('.box') !== null) {
        document.querySelector('.box').remove();
    }

    main.addEventListener('click', function (event) {
        userAnswer = event.target.textContent;

        if (questionNumber >= questionsArray.length || timerCount < 1) {
            h1El.remove();
            setTimeout(function () {
                displayResult();
                addToHighScores();
            }, 600);

            stopTimer = true;
        }

        if (userAnswer.substring(3) !== currentCorrectAnswer) {
            timerEl.style.backgroundColor = 'red';
            timerCount -= 10;
            displayCorrectWrong('Wrong!');
            removeAnswerBox();
            if (questionNumber < questionsArray.length)
                display1Question();
        } else {
            score += 10;
            displayCorrectWrong('Correct!');
            removeAnswerBox();
            if (questionNumber < questionsArray.length)
                display1Question();

        }

    })
}

function removeAnswerBox() {
    document.querySelector('.answers-list').remove();
}

//displays if an answer was Correct or Wrong
function displayCorrectWrong(text) {
    let result = document.querySelector('#result');
    result.textContent = text;
    document.querySelector('section').style.display = 'inherit';
    setTimeout(function () {
        document.querySelector('section').style.display = 'none';
    }, 1000);
}

//displays final result of test
function displayResult() {
    const finalResultBox = document.createElement('div');
    finalResultBox.classList.add('centerItems');

    const h2 = document.createElement('h2');
    h2.textContent = 'All done!';

    const scoreText = document.createElement('p');
    scoreText.textContent = `Your final score is ${score}`;

    const inputBoxText = document.createElement('span');
    inputBoxText.textContent = 'Enter initials';

    const inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');

    const button = document.createElement('button');
    button.setAttribute('id', 'submit')
    button.textContent = 'Submit';

    finalResultBox.appendChild(h2);
    finalResultBox.appendChild(scoreText);
    finalResultBox.appendChild(inputBoxText);
    finalResultBox.appendChild(inputBox);
    finalResultBox.appendChild(button);

    document.querySelector('main').appendChild(finalResultBox);
}

//displays high scores after submit
function addToHighScores() {
    document.querySelector('#submit').addEventListener('click', function () {
        let userName = document.querySelector('input').value;
        localStorage.setItem(userName, JSON.stringify(score));
        document.querySelector('.centerItems').remove();

        createHighScoreBox();

    });
}

//creates list from local storage and appends to parent ordered list
function displayHighScores(parentList) {
    let listOrder = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        listOrder.push(value + ',' + key);
    }

    listOrder.sort();
    listOrder.reverse();

    listOrder.forEach(each => {
        let liItem = document.createElement('li');
        liItem.textContent = each.substring(each.indexOf(',') + 1) + ' - ' + each.substring(0, each.indexOf(','));

        parentList.appendChild(liItem);
    })


}


//create highScore board
function createHighScoreBox() {
    const finalResultBox = document.createElement('div');
    finalResultBox.classList.add('centerItems');

    const h2 = document.createElement('h2');
    h2.textContent = 'Highscores';

    const scoreText = document.createElement('ol');
    scoreText.classList.add('ol-style');

    displayHighScores(scoreText);

    const goBackBtnTemp = document.createElement('button');
    goBackBtnTemp.setAttribute('id', 'goBack');
    goBackBtnTemp.classList.add('button-display');
    goBackBtnTemp.textContent = 'Go Back';

    const clearBtnTemp = document.createElement('button');
    clearBtnTemp.setAttribute('id', 'clear-button');
    clearBtnTemp.classList.add('button-display');
    clearBtnTemp.textContent = 'Clear Highscores';

    finalResultBox.appendChild(h2);
    finalResultBox.appendChild(scoreText);
    finalResultBox.appendChild(goBackBtnTemp);
    finalResultBox.appendChild(clearBtnTemp);

    document.querySelector('main').appendChild(finalResultBox);

    const clearBtn = document.querySelector('#clear-button');
    const goBackBtn = document.querySelector('#goBack');

    clearBtn.addEventListener('click', function(){
        document.querySelector('ol').remove();
        localStorage.clear();
    });

    goBackBtn.addEventListener('click', function(){
        location.reload();
    });

}
