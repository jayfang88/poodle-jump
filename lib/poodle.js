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
    }

    keyup(e) {
        // console.log('stopped moving')
    }

    landedOn(platform) {
        let poBottom = Math.floor(this.y + this.h/2);
        // let plTop = Math.floor(platform.y);
        let plTop = [];
        for (let i = platform.y-5; i < platform.y+5; i++) {
            plTop.push(i)
        }

        let poMid = Math.floor(this.w / 2 + this.x)
        // debugger;
        if ((plTop.includes(poBottom)) && this.overlap(poMid, platform)) {
            // debugger;
            return true;
        } else {
            return false;
        }
    }

    overlap(poMid, platform) {
        let x = platform.x;
        let w = platform.w;
        let pEnd = x + w;
        if ((poMid >= x) && (poMid <= pEnd)) {
            return true;
        } else {
            return false;
        }
    }

    // landedOn(platform) {
    //     let poBottom = Math.floor(this.y + (this.h / 2));
    //     // let plTop = Math.floor(platform.y);
    //     let plTop = [];
    //     for (let i = platform.y-5; i < platform.y + 5; i++) {
    //         plTop.push(i)
    //     }

    //     let poContact = [];
    //     let poRight = this.x + this.w;
    //     for (let i = this.x; i < poRight; i++) {
    //         poContact.push(Math.floor(i));
    //     }

    //     let plContact = [];
    //     let platformW = platform.x + platform.w;
    //     for (let j = platform.x; j < platformW; j++) {
    //         plContact.push(Math.floor(j));
    //     }
    
    //     let poMid = Math.floor(((this.x + this.w) / 2) + this.x);

    //     // (this.overlap(poContact, plContact))
    //     if (plTop.includes(poBottom) && (this.overlapping(poMid, platform))) {
    //         console.log('bouncing');
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // overlapping(poMid, platform) {
    //     if ((poMid >= platform.x) && (poMid <= (platform.x + platform.w))) {
    //         return true;
    //     }
    //     return false;
    // }

    // overlap(poodleB, platformT) {
    //     for (let i = 0; i < poodleB.length; i++) {
    //         if (platformT.includes(poodleB[i])) return true;
    //     }
    //     return false;
    // }

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