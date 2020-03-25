import Platform from './platform';
import Game from './game';
window.platform = Platform;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');
    const game = new Game(canvas);
    

    console.log('we up baby')
});