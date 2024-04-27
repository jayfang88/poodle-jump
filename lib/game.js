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
        this.highScorePage = document.querySelector('#highscore-page')
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
        
        this.platforms.forEach(platform => platform.draw(this.ctx));
        this.poodle.draw(this.ctx)
        
        this.updateScore();
    }
    
    // if lose, stop animation
    // check if highscore achieved
        // if yes, show form to enter name
        // submit and take them to highscores page
    // if not highscore, show gameOver page
    lose(requestId) {
        cancelAnimationFrame(requestId);
        // this.checkHighScores();
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
        if (highScores.length < 3 || highScores.some(highScore => highScore.score < this.score)) {
            this.showHighScorePage();
            const item = {
                player: 'USR',
                score: this.score,
                time: 'time'
            }
            highScores.push(item);
            highScores.sort((a,b) => b.score-a.score);
            highScores = highScores.slice(0,3);
            // localStorage.setItem(`${this.difficulty}highscores`, JSON.stringify(highScores));
            this.easyHighScores = JSON.parse(localStorage.getItem('easyhighscores')) || [];
            this.normalHighScores = JSON.parse(localStorage.getItem('normalhighscores')) || [];
            this.insaneHighScores = JSON.parse(localStorage.getItem('insanehighscores')) || [];
            this.scoreBoards.forEach(scoreboard => this.populateScoreboard(scoreboard));
        }
    }

    // reveals the highscore page. after user inputs name and submits, 
    // call submitHighScore to update localStorage and highscores list
    showHighScorePage() {
        console.log('removing hidden for highscorepage', this.highScorePage)
        this.highScorePage.classList.remove('hidden');
    }

    submitHighScore(e) {
        e.preventDefault();
        console.log('GOTTEM');
    }

    populateScoreboard(scoreboard) {
        const difficulty = scoreboard.id.split('-')[0];
        let leadersList = JSON.parse(localStorage.getItem(`${difficulty}highscores`)) || [];
        const list = leadersList.map((leader, i) => {
            return `
                    <li>
                        #${i+1}: 
                        ${leader.player} | ${leader.score} | ${leader.time}
                    </li>
                `
        });
        const l = [];
        for (let i = 0; i < 3; i++) {
            l.push(list[i] || `<li>#${i+1}: --- | --- | ---</li>`)
        }
        scoreboard.innerHTML = l.join('');
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