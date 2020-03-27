import $ from 'jquery';
import Platform from './platform';
import Game from './game';
import GameView from './game_view';
window.platform = Platform;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    // $('#replay').addClass('hidden');

    // const playButton = document.getElementById('play')
    // playButton.addEventListener('click', () => {
    //     playButton.classList.add('hidden');
    //     const game = new Game(canvas);
    //     document.onkeydown = e => game.keydown(e);
    //     document.onkeyup = e => game.keyup(e);
    //     new GameView(game).start();

    $('#start').click(() => {
        $('#start').addClass('hidden');
        const game = new Game(canvas);
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        new GameView(game).animate();
    });
    
    $('#replay').addClass('hidden');
    $('#replay').click(() => {
        window.location.reload();
    })

    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
});