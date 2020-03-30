import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    let replay = document.getElementById('replay');
    let gameOver = document.getElementById('game-over');
    replay.classList.add('hidden');
    gameOver.classList.add('hidden');

    let instructions = document.getElementById('instructions');
    let selectMode = document.getElementById('select-mode');
    
    let easy = document.getElementById('easy');
    easy.addEventListener('click', () => {
        instructions.classList.add('hidden');
        selectMode.classList.add('hidden');
        const game = new Game(canvas, 'easy');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    });

    let normal = document.getElementById('normal');
    normal.addEventListener('click', () => {
        instructions.classList.add('hidden');
        selectMode.classList.add('hidden');
        const game = new Game(canvas, 'normal');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    });

    let insane = document.getElementById('insane');
    insane.addEventListener('click', () => {
        instructions.classList.add('hidden');
        selectMode.classList.add('hidden');
        const game = new Game(canvas, 'insane');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    });

    replay.addEventListener('click', () => {
        window.location.reload();
        // replay.classList.add('hidden');
        // gameOver.classList.add('hidden');
        // game.restart();
    })

    let gameTitle = document.getElementById('game-title');
    gameTitle.addEventListener('click', () => {
        window.location.reload();
    })

    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
});