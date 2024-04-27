import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    let replay = document.getElementById('replay');
    let gameOver = document.getElementById('game-over');
    let goHome = document.getElementById('go-home');
    let instructions = document.getElementById('instructions');
    let example = document.getElementsByClassName('home-demo')[0];
    let selectMode = document.getElementById('select-mode');
    const game = new Game(canvas, 'normal');
    let gameModes = Array.from(document.getElementsByClassName('game-mode'));
    let gameTitle = document.getElementById('game-title');
    let scoreBoards = Array.from(document.getElementsByClassName('scoreboard-leaders'));
    let highScoreForm = document.querySelector('.highscore-page-form');
    let localLeaders = document.querySelector('#local-leaders-button');

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    setInterval(() => {
        document.getElementById('home-platform').style.backgroundColor = getRandomColor();
    }, 802);
    
    document.onkeydown = e => game.keydown(e);
    document.onkeyup = e => game.keyup(e);

    gameModes.forEach(gameMode => {
        gameMode.addEventListener('click', () => {
            instructions.classList.add('hidden');
            example.classList.add('hidden');
            selectMode.classList.add('hidden');
            game.addDifficulty(gameMode.id);
            game.play();
        })
    })

    replay.addEventListener('click', () => {
        replay.classList.add('hidden');
        gameOver.classList.add('hidden');
        goHome.classList.add('hidden');
        game.restart();
    })

    goHome.addEventListener('click', () => {
        window.location.reload();
    })

    gameTitle.addEventListener('click', () => {
        window.location.reload();
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

    highScoreForm.addEventListener('submit', game.submitHighScore)
});