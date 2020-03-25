import Platform from './platform';
import Game from './game';
import GameView from './game_view';
window.platform = Platform;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const game = new Game(canvas);
    new GameView(game).start();
    // document.onkeydown = e => game.keydown(e);
    // document.onkeyup = e => game.keyup(e);
    // setInterval(game.update, 10);
    // game.play();

    console.log('we up baby')
});