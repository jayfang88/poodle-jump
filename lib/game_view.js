export default class Gameview {
    constructor(game) {
        this.game = game;
        // this.poodle = this.game.addPoodle();
    }

    start() {
        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        this.game.moveObjects();
        this.game.draw();
        
        requestAnimationFrame(this.animate.bind(this));
    }
}