## Poodle Jump

[Live Link](https://jayfang88.github.io/poodle-jump/)

### Background
Poodle Jump is a simple 1-player game, inspired by the classic mobile game "Doodle Jump." The objective of the game is to last as long as you can by continuously jumping on platforms.

![Poodle Jump demo](assets/pj-demo.gif)

### Controls
- Select desired game difficulty
- Control the Poodle with '<' and '>' keys
- View your current score, displayed in the upper left corner

### Architecture and Technologies
- Vanilla JavaScript for game logic and event handlers
- HTML5 Canvas for DOM manipulation and rendering
- Webpack to bundle and serve up scripts

### Functionality & MVP
Within Poodle Jump, users are able to:
- Select desired game difficulty
- Move the poodle left and right in the game
- Wrap around the edge to prevent boundaries and falling off the screen
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
    
    //Consistently add gravity to y velocity. This updates and increases yVel
    //each animation frame.
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

    //Locate the bottom y of poodle and check if it is within the y values of 
    //the platform. Check if poodle x edges are at least 10px within platform x values.
    if ((poBottom <= platform.y + platform.h + 3) && (poBottom >= platform.y - 3) && 
    (this.x >= platform.x - this.r + 10) && (this.x <= platform.x + platform.w - 10)) {
        //If poodle is already jumping or on it's way up, do not repeatedly jump.
        //Only jumps if yVel is positive, or the poodle is falling once again.
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
- Replace player icon from white ball to preloaded poodle images
- Allow users to select desired character to play with
- Implement game sounds
