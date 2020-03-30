import $ from 'jquery';
import Game from './game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    $('#easy').click(() => {
        $('#instructions').addClass('hidden');
        $('#select-mode').addClass('hidden');
        const game = new Game(canvas, 'easy');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    })
    
    $('#normal').click(() => {
        $('#instructions').addClass('hidden');
        $('#select-mode').addClass('hidden');
        const game = new Game(canvas, 'normal');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    });

    $('#insane').click(() => {
        $('#instructions').addClass('hidden');
        $('#select-mode').addClass('hidden');
        const game = new Game(canvas, 'insane');
        document.onkeydown = e => game.keydown(e);
        document.onkeyup = e => game.keyup(e);
        game.play();
    })
    
    $('#replay').addClass('hidden');
    $('#game-over').addClass('hidden');

    $('#replay').click(() => {
        window.location.reload();
        // $('#replay').addClass('hidden');
        // $('#game-over').addClass('hidden');
        // game.restart();
    })

    $('#game-title').click(() => {
        window.location.reload();
    })

    window.addEventListener('keydown', (e) => {
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            e.preventDefault();
        }
    });
});