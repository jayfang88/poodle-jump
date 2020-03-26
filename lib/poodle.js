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
        this.yVel = 10;
        this.jumping = true;
    }

    keydown(e) {
        this.moveSideways(e);
        // console.log('moving!')
    }

    keyup(e) {
        // clearInterval(this.xMovement);
        // console.log('stopped moving')
    }

    landedOn(platform) {
        let poodleB = this.y + (this.h / 2);
        let platformT = [];
        for (let i = platform.y-5; i < platform.y + 5; i++) {
            platformT.push(i)
        }
        // platform.y;
        // debugger;

        let poodleBase = [];
        let poodleW = this.x + this.w;
        for (let i = this.x; i < poodleW; i++) {
            poodleBase.push(Math.floor(i));
        }
        let platformTop = [];
        let platformW = platform.x + platform.w;
        for (let j = platform.x; j < platformW; j++) {
            platformTop.push(Math.floor(j));
        }
        // debugger;
        if ((platformT.includes(poodleB)) && (this.overlap(poodleBase, platformTop))) {
            // debugger;
            console.log('should bounce');
            return true;
        } else {
            // debugger;
            return false;
        }
    }

    overlap(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.includes(arr1[i])) return true;
        }
        return false;
    }

    move() {
        if (this.jumping) {
            this.y -= 10;
            setTimeout(() => {this.jumping = false}, 300);
        } else {
            this.y += this.yVel;
        }
    }

    moveSideways(e) {
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
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.fill();    
    }

    // bounds() {
    //     return {
    //         left: this.x - this.w / 2,
    //         right: this.x + this.w / 2,
    //         top: this.y,
    //         bottom: this.y + this.h
    //     };
    // }

    outOfBounds() {
        return this.y + (this.h / 2) > this.boardDimensions.height;
    }
}