export default class Poodle {
    constructor(dimensions, difficulty) {
        this.boardDimensions = dimensions;
        this.difficulty = difficulty;
        this.heightJumped = 0;
        this.movingLeft = false;
        this.movingRight = false;
        this.facing = 'left';
        this.jumping = true;

        this.leftImg = new Image();
        this.leftImg.src = 'assets/images/poodle-left.png';
        this.rightImg = new Image();
        this.rightImg.src = 'assets/images/poodle-right.png';

        this.x = dimensions.width / 2 - 25;
        this.y = 450;
        this.r = 25;
        this.w = 50;
        this.h = 47;

        switch(this.difficulty) {
            case 'easy':
                this.xVel = 5;
                this.yVel = 11;
                this.gravity = 0.35;
                break;
            case 'insane':
                this.xVel = 7;
                this.yVel = 20;
                this.gravity = 0.95;
                break;
            default:
                this.xVel = 5;
                this.yVel = 13;
                this.gravity = 0.5;
        };
    }
    
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

        if (this.movingLeft) {
            this.moveLeft();
        } else if (this.movingRight) {
            this.moveRight();
        }
    }

    landedOn(platform) {
        let poBottom = this.y + this.h;
        
        //Locate the bottom y of poodle and check if it is within the y values of 
        //the platform. Check if poodle x edges are at least 10px within platform x values.
        if ((poBottom <= platform.y + platform.h + 3) && (poBottom >= platform.y - 1) && 
        (this.x >= platform.x - this.w + 10) && (this.x <= platform.x + platform.w - 10)) {
            //If poodle is already jumping or on it's way up, do not repeatedly jump.
            //Only jumps if yVel is positive, or the poodle is falling once again.
            if (this.yVel > 0) {
                this.jumping = true;
                platform.randColor();
                this.heightJumped += (this.yVel * 4);
                return true;
            }
        } else {
            return false;
        }
    }

    moveLeft() {
        this.x -= this.xVel;
        if (this.x <= -this.w) this.x = this.boardDimensions.width;
    }

    moveRight() {
        this.x += this.xVel;
        if (this.x >= this.boardDimensions.width) this.x = -this.w
    }

    draw(ctx) {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        
        if (this.facing === 'left') {
            ctx.drawImage(this.leftImg, this.x, this.y);
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.w/2, 0, 2 * Math.PI);
            // ctx.fillStyle = 'rgba(255, 255, 255)';
            // ctx.fill();    
        } else {
            ctx.drawImage(this.rightImg, this.x, this.y);
        }
    }

    outOfBounds() {
        return this.y >= this.boardDimensions.height;
    }
}