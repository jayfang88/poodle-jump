export default class Poodle {
    constructor(dimensions) {
        this.boardDimensions = dimensions;
        this.heightJumped = 0;
        this.left = false;
        this.right = false;
        this.jumping = true;
        this.x = dimensions.width / 2;
        this.y = 450;
        this.r = 25;
        this.w = 50;
        this.h = 50;

        this.xVel = 5;
        this.yVel = 10;
        this.gravity = 0.3;
        this.gravitySpeed = 0;
    }
    
    move() {
        if (this.jumping) {
            this.jumping = false;
            this.gravitySpeed = 0;
            this.yVel = -10;
        }
        
        this.gravitySpeed += this.gravity;
        this.y += this.yVel + this.gravitySpeed;

        if (this.left) {
            this.moveLeft();
        } else if (this.right) {
            this.moveRight();
        }
    }

    landedOn(platform) {
        let poBottom = this.y + this.r;
        
        if ((poBottom <= platform.y + platform.h) && (poBottom >= platform.y) && 
        (this.x >= platform.x - this.r + 10) && (this.x <= platform.x + platform.w - 10)) {
            this.jumping = true;
            this.heightJumped += this.gravitySpeed;
            this.move();
            return true;
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
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.fill();    
        // ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    outOfBounds() {
        return this.y > this.boardDimensions.height;
    }
}