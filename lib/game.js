import Platform from './platform';
import Poodle from './poodle';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.dimensions = { width: canvas.width, height: canvas.height };
        // this.registerEvents();
        this.restart();
        this.score = 0;
    }

    play() {
        this.running = true;
        this.animate();
    }

    restart() {
        this.running = false;
        this.score = 0;
        this.poodle = new Poodle(this.dimensions)

        this.animate();
    }

    gameOver() {
        return (
            this.poodle.outOfBounds()
        )
    }

    animate() {
        this.drawBackground()
        this.poodle.animate(this.ctx)
    }

    drawBackground() {
        this.ctx.fillStyle = '#333'
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
    }

};