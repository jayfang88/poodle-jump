import Platform from './platform';
import Poodle from './poodle';

const NUM_PLATFORMS = 20

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.gameOver = false;
        // this.running = false;
        // this.score = 0;
        this.platforms = [];
        this.poodle = new Poodle(this.dimensions);
        this.addPlatforms();
        // this.restart();
    }

    addPlatforms() {
        for (let i = 0; i < NUM_PLATFORMS; i++) {
            this.platforms.push(new Platform({ game: this }));
        }
    };

    step() {
        this.moveObjects();
        this.checkJump();
    }
    
    moveObjects() {
        this.platforms.forEach(platform => platform.move())
        this.poodle.move();
        if (this.poodle.outOfBounds()) {
            alert('omg');
            this.gameOver = true;
        }
    }

    checkJump() {
        
    }

    keydown(e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            this.poodle.keydown(e)
        }
    }

    keyup(e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            this.poodle.keyup(e)
        }
    }

    // play() {
    //     this.running = true;
    //     this.animate();
    // }

    // restart() {
    //     // this.running = false;
    //     // this.score = 0;
    //     this.poodle = new Poodle(this.dimensions)
    //     this.addPlatforms();

    //     this.animate();
    // }
    
    // animate() {
    //     this.draw()
    // }
    
    draw() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        
        this.platforms.forEach(p => p.draw(this.ctx));
        this.poodle.draw(this.ctx)
    }
    
    // gameOver() {
    //     return this.poodle.outOfBounds();
    // }
};