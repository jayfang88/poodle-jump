import Platform from './platform';
import Poodle from './poodle';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.gameOver = false;
        this.score = 0;
        this.platforms = [];
    }

    addDifficulty(difficulty) {
        this.difficulty = difficulty;

        switch (difficulty) {
            case 'easy':
                this.num_platforms = 20;
                break;
            case 'insane':
                this.num_platforms = 20;
                break;
            default:
                this.num_platforms = 15;
        };

        this.addPlatforms();
        this.poodle = new Poodle(this.dimensions, difficulty);
    }

    addPlatforms() {
        for (let i = 0; i < this.num_platforms; i++) {
            this.platforms.push(new Platform(this));
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
        for (let i = 0; i < this.num_platforms; i++) {
            let platform = this.platforms[i];
            if (this.poodle.landedOn(platform)) {
                return true;
            }
        }
    }

    keydown(e) {
        if (e.keyCode === 37) {
            this.poodle.movingLeft = true;
            this.poodle.facing = 'left';
        } else if (e.keyCode === 39) {
            this.poodle.movingRight = true;
            this.poodle.facing = 'right';
        }
    }

    keyup(e) {
        if (e.keyCode === 37) {
            this.poodle.movingLeft = false;
        } else if (e.keyCode === 39) {
            this.poodle.movingRight = false;
        }
    }
    
    restart() {
        this.gameOver = false;
        this.score = 0;
        this.poodle = new Poodle(this.dimensions, this.difficulty);
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
        let replay = document.getElementById('replay');
        let gameOver = document.getElementById('game-over');
        let goHome = document.getElementById('go-home');
        replay.classList.remove('hidden');
        gameOver.classList.remove('hidden');
        goHome.classList.remove('hidden');
    }
    
    updateScore() {
        if (this.poodle.heightJumped > this.score) {
            this.score = Math.round(this.poodle.heightJumped);
        }
        
        this.ctx.font = '600 42px Courier'
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.score, 22, 50);
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