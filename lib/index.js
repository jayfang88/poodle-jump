import $ from 'jquery';
import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const game = new Game(canvas);
    document.onkeydown = e => game.keydown(e);
    document.onkeyup = e => game.keyup(e);

    $('#start').click(() => {
        $('#instructions').addClass('hidden');
        $('#start').addClass('hidden');
        game.play();
    });
    
    $('#replay').addClass('hidden');
    $('#game-over').addClass('hidden');

    $('#replay').click(() => {
        // window.location.reload();
        $('#replay').addClass('hidden');
        $('#game-over').addClass('hidden');
        game.restart();
    })

    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
});