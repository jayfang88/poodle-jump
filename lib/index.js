import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    let replay = document.getElementById('replay');
    let gameOver = document.getElementById('game-over');
    let goHome = document.getElementById('go-home');
    replay.classList.add('hidden');
    gameOver.classList.add('hidden');
    goHome.classList.add('hidden');

    let instructions = document.getElementById('instructions');
    let example = document.getElementsByClassName('home-demo')[0];
    let selectMode = document.getElementById('select-mode');
    
    const game = new Game(canvas, 'normal');
    document.onkeydown = e => game.keydown(e);
    document.onkeyup = e => game.keyup(e);

    let easy = document.getElementById('easy');
    easy.addEventListener('click', () => {
        instructions.classList.add('hidden');
        example.classList.add('hidden');
        selectMode.classList.add('hidden');
        game.addDifficulty('easy');
        game.play();
    });

    let normal = document.getElementById('normal');
    normal.addEventListener('click', () => {
        instructions.classList.add('hidden');
        example.classList.add('hidden');
        selectMode.classList.add('hidden');
        game.addDifficulty('normal');
        game.play();
    });

    let insane = document.getElementById('insane');
    insane.addEventListener('click', () => {
        instructions.classList.add('hidden');
        example.classList.add('hidden');
        selectMode.classList.add('hidden');
        game.addDifficulty('insane');
        game.play();
    });

    replay.addEventListener('click', () => {
        replay.classList.add('hidden');
        gameOver.classList.add('hidden');
        goHome.classList.add('hidden');
        game.restart();
    })

    goHome.addEventListener('click', () => {
        window.location.reload();
    })

    let gameTitle = document.getElementById('game-title');
    gameTitle.addEventListener('click', () => {
        window.location.reload();
    })

    //prevent default window movement if screen is minimized
    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
});