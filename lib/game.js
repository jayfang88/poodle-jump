import { get } from 'jquery';
import Platform from './platform';
import Poodle from './poodle';
import Timer from './timer';

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
        this.highScorePage = document.querySelector('#highscore-page');
        this.timer = new Timer();
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

    startTimer() {
        this.timer = new Timer();
        this.timer.startTimer();
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
        this.poodle = new Poodle(this.dimensions, this.difficulty);
        this.platforms = [];
        this.addPlatforms();
        this.play();
        this.timer.startTimer();
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
        this.timer.stopTimer();
        // this.checkHighScores();
        let replay = document.getElementById('replay');
        let gameOver = document.getElementById('game-over');
        let goHome = document.getElementById('go-home');
        replay.classList.remove('hidden');
        gameOver.classList.remove('hidden');
        goHome.classList.remove('hidden');
    }

    // select corresponding high scores list based on current difficulty
    // if curr score should be in the top 3, reveal input name form
    // submit form function handles adding to localstorage

    getHighScoreList() {
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
        return highScores;
    }

    checkHighScores() {
        let highScores = this.getHighScoreList();
        if (highScores.length < 3 || highScores.some(highScore => highScore.score < this.score)) {
            this.highScorePage.classList.remove('hidden');
        }
    }

    addHighScore() {
        const input = document.querySelector('#highscore-input');
        const item = {
            player: input.value,
            score: this.score,
        }
        let highScores = this.getHighScoreList();
        highScores.push(item);
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 3);
        localStorage.setItem(`${this.difficulty}highscores`, JSON.stringify(highScores));
        this.easyHighScores = JSON.parse(localStorage.getItem('easyhighscores')) || [];
        this.normalHighScores = JSON.parse(localStorage.getItem('normalhighscores')) || [];
        this.insaneHighScores = JSON.parse(localStorage.getItem('insanehighscores')) || [];
        this.scoreBoards.forEach(scoreboard => this.populateScoreboard(scoreboard));
    }

    submitHighScore(e) {
        e.preventDefault();
        this.addHighScore();
        this.highScorePage.classList.add('hidden');
    }

    populateScoreboard(scoreboard) {
        const difficulty = scoreboard.id.split('-')[0];
        let leadersList = JSON.parse(localStorage.getItem(`${difficulty}highscores`)) || [];
        const list = leadersList.map((leader, i) => {
            let displayScore = this.timer.convertElapsedTime(leader.score, true);
            return `
                    <li class='scoreboard-list-item'>
                        #${i + 1} | ${displayScore} | 
                        ${leader.player} 
                    </li>
                `
        });
        const l = [];
        for (let i = 0; i < 3; i++) {
            l.push(list[i] || `<li>#${i+1} | --- | ---</li>`)
        }
        scoreboard.innerHTML = l.join('');
    }
    
    updateScore() {
        this.score = this.timer.elapsedTime;
        let displayScore = this.timer.convertElapsedTime(this.score)
        
        this.ctx.font = '600 42px Courier'
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(displayScore, 22, 50);
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