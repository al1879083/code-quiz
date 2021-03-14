var questionArr = [
    {
        question: '1. Inside which HTML element do we put the JavaScript?',
        answer1: '&lt;script&gt;',
        answer2: '&lt;js&gt;',
        answer3: '&lt;scripting&gt;',
        answer4: '&lt;javascript&gt;',
        corAns: '&lt;script&gt;'
    },
    {
        question: '2. Select the property that is used to create spacing between HTML elements?',
        answer1: 'spacing',
        answer2: 'margin',
        answer3: 'border',
        answer4: 'padding',
        corAns: 'margin'
    },
    {
        question: '3. In CSS,select the property used to set the background color of an image?',
        answer1: 'color:background',
        answer2: 'background:color',
        answer3: 'color',
        answer4: 'background-color',
        corAns: 'background-color'
    },
    {
        question: '4. In CSS,Select the property used to set the spacing in between lines of text?',
        answer1: 'letter-spacing',
        answer2: 'spacing',
        answer3: 'line-height',
        answer4: 'line-spacing',
        corAns: 'line-height'
    },
    {
        question: '5. Select the option to make a list that lists the items with bullets?',
        answer1: 'Dl',
        answer2: 'Ul',
        answer3: 'List',
        answer4: 'Ol',
        corAns: 'Ul'
    },
    {
        question: '6. For users that use the tab key to navigate websites, what property represents this way of moving from one element to another?',
        answer1: 'a:link',
        answer2: 'a:active',
        answer3: 'a:focus',
        answer4: 'a:visited',
        corAns: 'a:focus'
    },
    {
        question: '7. Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        answer1: 'alt',
        answer2: 'title',
        answer3: 'src',
        answer4: 'class',
        corAns: 'alt'
    },
    {
        question: '8. Which event occurs when the user clicks on an HTML element?',
        answer1: 'clickOn',
        answer2: 'onClick',
        answer3: 'onmouseover',
        answer4: 'onclick',
        corAns: 'onclick'
    }
];



window.addEventListener('load', function (ev) {
    // HTML elements
    var viewHighScores = document.getElementById('view-high-scores');
    var highScores = document.getElementById('high-scores');
    var goBack = document.querySelector('.go-back');
    var quizChallenge = document.getElementById('quiz-challenge');
    var startQuizBtn = document.getElementById('start-quiz');
    var quizStart = document.getElementById('quiz-start');
    var quizQuestion = document.querySelector('.quiz-question');

    var questionList = document.querySelectorAll('.quiz-question ul li');
    var timeoutID;
    var quizSubmit = document.getElementById('quiz-submit');

    var correct = document.getElementById('correct');
    correct.style.fontSize = "x-large";
    correct.style.color = "blue";
    correct.style.fontStyle = "italic";
    var wrong = document.getElementById('wrong');
    wrong.style.fontSize = "x-large";
    wrong.style.color = "red";

    var scoreNum = document.getElementById('score');

    var textInput = quizSubmit.getElementsByTagName('input')[0];
    var submitBtn = quizSubmit.getElementsByTagName('button')[0];
    var highScoreList = document.getElementById('high-score-list');

    var oneMoreTimeBtn = quizSubmit.getElementsByTagName('button')[1];

    //Event listeners

    // View leaderboard
    viewHighScores.addEventListener('click', function (ev1) {
        highScores.style.display = 'block';
        quizChallenge.style.display = 'none';
        
        renderHighScores();
    });

    // Go back button
    goBack.addEventListener('click', function (evt) {
        quizChallenge.style.display = 'block';
        highScores.style.display = 'none';
    });

    // Start button
    startQuizBtn.addEventListener('click', function (ev1) {
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';

        resetTimer();
    });

    submitBtn.addEventListener('click', function () {
        var initAndScore = textInput.value + ' - ' + scoreNum.textContent;

        var scoreRecord = [];
        if (localStorage.getItem('scoreRecord')) {
            scoreRecord = JSON.parse(localStorage.getItem('scoreRecord'));
        }

        // if someone type nothing or just space, will alert him to type.
        if (textInput.value.trim() === ''){
            alert('Please type something!');
        }else {
            scoreRecord.unshift(initAndScore);
            var recordSet = [...new Set(scoreRecord)];
            localStorage.setItem('scoreRecord', JSON.stringify(recordSet));

            renderHighScores();

            alert("You're all set!");
        }
    });

    oneMoreTimeBtn.addEventListener('click', function () {
        window.location.reload();
    });

    // Start the game
    questionChange();



    // clearHighScores
    var clearHighScores = document.querySelector('.clear');
    clearHighScores.addEventListener('click', function (evt) {
        // localStorage.clear();
        localStorage.setItem('scoreRecord', JSON.stringify([]));
        renderHighScores();
    });


    //Functions

    function renderQuestion(index) {
        var quizQuestionTitle = quizQuestion.querySelector('.quiz-question-title');
        var allLis = quizQuestion.querySelectorAll('li');
        correct.style.display = 'none';
        wrong.style.display = 'none';
        quizQuestionTitle.textContent = questionArr[index].question;

        allLis.forEach(function (li) {
            li.className = '';
            li.style.backgroundColor = '#000091';
        });

        allLis[0].textContent = questionArr[index].answer1;
        allLis[1].textContent = questionArr[index].answer2;
        allLis[2].textContent = questionArr[index].answer3;
        allLis[3].textContent = questionArr[index].answer4;
    }
    // Clears old leaderboard and writes new leaderboard
    function renderHighScores(){
        // Clear the screen
        highScoreList.innerHTML = '';
        // Get the new leaderboard
        var leaderboard = JSON.parse(localStorage.getItem('scoreRecord'));
        // Add on to the final scoreboard
        leaderboard.forEach(function(ele){
            var playerList = createNewLi();
            playerList.textContent = ele;
            // Append new player-score to leaderboard
            highScoreList.appendChild(playerList);
        });
    }

    var score = 0;

    function questionChange() {
        // Current question
        var index = 0;
        questionList.forEach(function (questionBox) {
            correct.style.display = '';
            wrong.style.display = '';
            // Wait for the player to click on an answer
            questionBox.addEventListener('click', function () {
                questionBox.style.backgroundColor = "#99ccff";
                // when the answer is correct, the correct part shows and score +1. when get the wrong answer, the wrong part shows and timer -5
                if (questionBox.innerHTML === questionArr[index].corAns) {
                    score++;
                    correct.style.display = 'block';
                } else {
                    wrong.style.display = 'block';
                    timer -= 10;
                }

                // if your answers are all wrong, you'll get 0
                if (score === 0){
                    scoreNum.textContent = 0;
                }else {
                    scoreNum.textContent = score * parseInt(80 / questionArr.length) + parseInt(timer / 5);
                }

                // set a timeout for every question
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                    if (index >= questionArr.length - 1) {
                        quizQuestion.style.display = 'none';
                        quizSubmit.style.display = 'block';
                        correct.style.display = 'none';
                        wrong.style.display = 'none';
                    } else {
                        index++;
                    }

                    renderQuestion(index);
                    clearTimeout(timeoutID);
                }, 800);

            });

        });
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

});

function createNewLi() {
    return document.createElement('li');
}

var timer;
var countdownTimer = document.getElementById('timer-num');
var quizSubmit = document.getElementById('quiz-submit');



function resetTimer() {
    // timer gets 15 seconds for each question
    timer = 15 * questionArr.length;
    // set HTML timer to the javascript timer
    countdownTimer.textContent = timer;

    // start the timer controlling the game timer
    setInterval(function () {
        // count down 1 second
        timer--;
        // update the HTML timer
        countdownTimer.textContent = timer;
        
        // Alert once time is up
        if (timer <= 0) {
            timer = 0;
            alert('Times Up!');
        }
        // submit page shows up, clear the interval
        if (quizSubmit.style.display === 'block') {
            countdownTimer.textContent = "0";
        }
    }, 1000);
}
