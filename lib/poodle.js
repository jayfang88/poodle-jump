const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_HEIGHT: 20
}

export default class Poodle {
    constructor(dimensions) {
        // this.x = 320;
        this.x = dimensions.width / 2;
        this.y = 700;
        this.w = 50;
        this.h = 50;
        this.boardDimensions = dimensions;
        this.vel = 0;
        this.moveX = 0;
    }

    animate(ctx) {
        // this.movePoodle();
        this.draw(ctx);
    }

    movePoodle(e) {
        this.moveX = 0;

        switch(e.keyCode) {
            case 37:
                this.moveX -= 2;
                break
            case 39:
                this.moveX += 2;
                break;
            default:
                this.moveX = 0;
        }

        this.draw();
    }

    draw(ctx) {
        ctx.clearRect(0, 0, ctx.width, ctx.height)
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        
        ctx.beginPath();
        ctx.arc(
            this.x + this.moveX, this.y, this.w/2, 0, 2 * Math.PI
        );

        ctx.fillStyle = 'white';
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