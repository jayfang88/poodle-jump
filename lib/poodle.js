const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_HEIGHT: 20
}

export default class Poodle {
    constructor(dimensions) {
        this.x = dimensions.width / 2;
        this.y = 500;
        this.w = 50;
        this.h = 50;
        this.boardDimensions = dimensions;
        this.xVel = 20;
        this.yVel = 20;
    }

    keydown(e) {
        this.move(e)
        // console.log('moving!')
    }

    keyup(e) {
        // clearInterval(this.xMovement);
        // console.log('stopped moving')
    }

    // animate(ctx) {
    //     // this.move();
    //     this.draw(ctx);
    // }

    move(e) {
        e.keyCode === 37 ? this.moveLeft() : this.moveRight();
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
        ctx.clearRect(0, 0, ctx.width, ctx.height)
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.fill();    
    }

    bounds() {
        return {
            left: this.x - this.w / 2,
            right: this.x + this.w / 2,
            top: this.y,
            bottom: this.y + this.h
        }
    }

    outOfBounds() {
        return this.y + this.h > this.boardDimensions.height
    }
}