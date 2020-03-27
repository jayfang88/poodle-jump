import $ from 'jquery';

export default class Gameview {
    constructor(game) {
        this.game = game;
        // this.poodle = this.game.addPoodle();
    }

    start() {
        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        this.game.step();
        this.game.draw();
        let requestId;

        if (!this.game.gameOver) {
            requestId = requestAnimationFrame(this.animate.bind(this));
        } else {
            cancelAnimationFrame(requestId);
            console.log('you lose');
        }
    }
}