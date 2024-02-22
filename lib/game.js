import Platform from './platform';
import Poodle from './poodle';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.gameOver = false;
        this.score = 0;
        this.platforms = [];
        this.easyHighScores = JSON.parse(localStorage.getItem('easyhighscores')) || [];
        this.normalHighScores = JSON.parse(localStorage.getItem('normalhighscores')) || [];
        this.insaneHighScores = JSON.parse(localStorage.getItem('insanehighscores')) || [];
        this.scoreBoards = Array.from(document.getElementsByClassName('scoreboard-leaders'));
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
        this.easyHighScores = JSON.parse(localStorage.getItem('easyhighscores')) || [];
        this.normalHighScores = JSON.parse(localStorage.getItem('normalhighscores')) || [];
        this.insaneHighScores = JSON.parse(localStorage.getItem('insanehighscores')) || [];
        this.addPlatforms();
        this.play();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        
        this.platforms.forEach(platform => platform.draw(this.ctx));
        this.poodle.draw(this.ctx)
        
        this.updateScore();
    }
    
    lose(requestId) {
        cancelAnimationFrame(requestId);
        console.log('you lost');
        this.checkHighScores();
        let replay = document.getElementById('replay');
        let gameOver = document.getElementById('game-over');
        let goHome = document.getElementById('go-home');
        replay.classList.remove('hidden');
        gameOver.classList.remove('hidden');
        goHome.classList.remove('hidden');
    }

    checkHighScores() {
        if (this.score === 0) return;
        let highScores;
        switch (this.difficulty) {
            case 'easy':
                highScores = this.easyHighScores;
                break;
            case 'normal':
                highScores = this.normalHighScores;
                break;
            case 'insane':
                highScores = this.insaneHighScores;
                break;
            default:
                highScores = [];
        };
        console.log(highScores);
        if (highScores.length < 3 || highScores.some(highScore => highScore.score < this.score)) {
            const item = {
                player: '[player entry]',
                score: this.score,
                time: '[time won]'
            }
            highScores.push(item);
            highScores.sort((a,b) => b.score-a.score);
            console.log('before slice', highScores)
            highScores = highScores.slice(0,3);
            console.log(highScores)
            localStorage.setItem(`${this.difficulty}highscores`, JSON.stringify(highScores));
            this.scoreBoards.forEach(scoreboard => this.populateScoreboard(scoreboard));
        }
    }

    populateScoreboard(scoreboard) {
        const difficulty = scoreboard.id.split('-')[0];
        let leadersList = JSON.parse(localStorage.getItem(`${difficulty}highscores`)) || [];
        console.log(leadersList);
        const list = leadersList.map(leader => {
            return `
                    <li>
                        ${leader.player} | ${leader.score} | ${leader.time}
                    </li>
                `
        }).join('');
        scoreboard.innerHTML = list;
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