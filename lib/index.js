import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const gameOverButtons = document.querySelectorAll('.game-over-buttons');
    const gameOver = document.getElementById('game-over');
    const replay = document.getElementById('replay');
    const goHome = document.getElementById('go-home');
    const goHomeLL = document.querySelector('#go-home-ll');
    const instructions = document.getElementById('instructions');
    const example = document.getElementsByClassName('home-demo')[0];
    const selectMode = document.getElementById('select-mode');
    const game = new Game(canvas, 'normal');
    const gameModes = Array.from(document.getElementsByClassName('game-mode'));
    const gameTitle = document.getElementById('game-title');
    const scoreBoardPage = document.querySelector('.scoreboard');
    const scoreBoards = Array.from(document.getElementsByClassName('scoreboard-leaders'));
    const highScoreForm = document.querySelector('.highscore-page-form');
    const localLeadersButton = document.querySelector('#local-leaders-button');

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function hideMainPage() {
        instructions.classList.add('hidden');
        example.classList.add('hidden');
        selectMode.classList.add('hidden');
        localLeadersButton.classList.add('hidden');
    }
    
    setInterval(() => {
        document.getElementById('home-platform').style.backgroundColor = getRandomColor();
    }, 802);
    
    document.onkeydown = e => game.keydown(e);
    document.onkeyup = e => game.keyup(e);

    gameModes.forEach(gameMode => {
        gameMode.addEventListener('click', () => {
            hideMainPage();
            game.addDifficulty(gameMode.id);
            game.play();
            game.startTimer();
        })
    })

    localLeadersButton.addEventListener('click', () => {
        hideMainPage();
        scoreBoardPage.classList.remove('hidden');
    })

    replay.addEventListener('click', () => {
        gameOver.classList.add('hidden');
        replay.classList.add('hidden');
        goHome.classList.add('hidden');
        game.restart();
    })

    Array.from([goHome, goHomeLL, gameTitle]).forEach(button => {
        button.addEventListener('click', () => {
            window.location.reload();
        })
    })

    //prevent default window movement if screen is minimized
    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
    
    scoreBoards.forEach(scoreboard => {
        game.populateScoreboard(scoreboard);
    });

    highScoreForm.addEventListener('submit', game.submitHighScore.bind(game))
});