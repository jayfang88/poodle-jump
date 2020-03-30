import $ from 'jquery';
import Platform from './platform';
import Poodle from './poodle';

const NUM_PLATFORMS = 15;

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.gameOver = false;
        this.score = 0;
        this.platforms = [];
        this.poodle = new Poodle(this.dimensions);
        this.addPlatforms();
    }

    addPlatforms() {
        for (let i = 0; i < NUM_PLATFORMS; i++) {
            this.platforms.push(new Platform({ game: this }));
        }
    };

    step() {
        this.moveObjects();
        this.checkLanding();
    }
    
    moveObjects() {
        this.platforms.forEach(platform => platform.move());
        this.poodle.move(); 

        if (this.poodle.outOfBounds()) {
            this.gameOver = true;
        }
    }

    checkLanding() {
        for (let i = 0; i < NUM_PLATFORMS; i++) {
            let platform = this.platforms[i];
            if (this.poodle.landedOn(platform)) {
                return true;
            }
        }
    }

    keydown(e) {
        if (e.keyCode === 37) {
            this.poodle.left = true;
        } else if (e.keyCode === 39) {
            this.poodle.right = true;
        }
    }

    keyup(e) {
        if (e.keyCode === 37) {
            this.poodle.left = false;
        } else if (e.keyCode === 39) {
            this.poodle.right = false;
        }
    }
    
    restart() {
        this.gameOver = false;
        this.score = 0;
        this.poodle = new Poodle(this.dimensions);
        this.platforms = [];
        this.addPlatforms();
        this.play();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        
        this.platforms.forEach(p => p.draw(this.ctx));
        this.poodle.draw(this.ctx)
        
        this.updateScore();
    }
    
    lose(requestId) {
        cancelAnimationFrame(requestId);
        $('#replay').removeClass('hidden');
        $('#game-over').removeClass('hidden');
    }
    
    updateScore() {
        if (this.poodle.heightJumped > this.score) {
            this.score = Math.round(this.poodle.heightJumped);
        }
        // this.score += this.poodle.heightIncrease;
        
        this.ctx.font = '40px Chalkboard'
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.score, 20, 50);
    }

    play() {
        this.step();
        this.draw();
        let requestId;

        if (!this.gameOver) {
            requestId = requestAnimationFrame(this.play.bind(this));
        } else {
            this.lose(requestId);
        }
    }
};