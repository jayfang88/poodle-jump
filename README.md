## Poodle Jump

[Live Link](https://jayfang88.github.io/poodle-jump/)

![](pj-test3.gif)

### Background
Poodle Jump is a simple 1-player game, inspired by the classic mobile game "Doodle Jump." The objective of the game is to last as long as you can by continuously jumping on platforms.

### Controls
- Control the Poodle with '<' and '>' keys
- Your current score is displayed in the upper left corner

### Architecture and Technologies
- Vanilla JavaScript for game logic and event handlers
- HTML5 Canvas for DOM manipulation and rendering
- Webpack to bundle and serve up scripts

### Functionality & MVP
Within Poodle Jump, users are able to:
- Select desired game difficulty
- Move the poodle left and right in the game
- View the current high score


### Implementation details
Different game modes are generated depending on user selection.
```javascript
let easy = document.getElementById('easy');
easy.addEventListener('click', () => {
    instructions.classList.add('hidden');
    selectMode.classList.add('hidden');
    const game = new Game(canvas, 'easy');
    document.onkeydown = e => game.keydown(e);
    document.onkeyup = e => game.keyup(e);
    game.play();
});
```

Poodle moves according to it's current 'jumping' status, taking into consideration the current y-velocity and gravity.
```javascript
move() {
    if (this.jumping) {
        this.jumping = false;
        this.gravitySpeed = 0;
            
        switch(this.difficulty) {
            case 'easy':
                this.yVel = -11;
                break;
            case 'insane':
                this.yVel = -20;
                break;
            default:
                this.yVel = -13;
        }
    }
        
    this.yVel += this.gravity;
    this.y += this.yVel

    if (this.left) {
        this.moveLeft();
    } else if (this.right) {
        this.moveRight();
    }
}
```

Collision detection between the poodle and platform determines if the poodle is 'jumping' or not.
```javascript
landedOn(platform) {
    let poBottom = this.y + this.r;

    if ((poBottom <= platform.y + platform.h + 3) && (poBottom >= platform.y - 3) && 
    (this.x >= platform.x - this.r + 10) && (this.x <= platform.x + platform.w - 10)) {
        if (this.yVel > 0) {
            this.jumping = true;
            this.heightJumped += (this.yVel * 4);
            return true;
        }
    } else {
        return false;
    }
}
```


### Future Features
- Replace player icon from white ball to preloaded avatar images
- Allow users to select desired avatar to play with
- Implement game sounds
