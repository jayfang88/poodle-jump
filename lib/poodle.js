const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_HEIGHT: 20
}

export default class Poodle {
    constructor(dimensions) {
        this.boardDimensions = dimensions;
        this.left = false;
        this.right = false;
        
        this.jumping = true;

        this.x = dimensions.width / 2;
        this.y = 450;
        this.w = 50;
        this.h = 50;
        this.xVel = 5;

        this.elasticity = 0.6;
        
        this.yVel = 10;
        this.gravity = 0.5;
        this.gravitySpeed = 0;
    }
    
    move() {
        if (this.jumping) {
            this.y -= 10
            setTimeout(() => {this.jumping = false}, 300);
            // let jumpHeight = 25;
            // jumpHeight *= this.elasticity;
            // if (jumpHeight < 1) {
            //     this.jumping = false;
            // }
            // this.yVel += this.gravity;
            // this.y -= this.yVel;
        } else {
            this.yVel = 10
            // this.gravitySpeed += this.gravity;
            // this.y += this.yVel + this.gravitySpeed;
            this.y += this.yVel;
        }
        // this.y += this.yVel;

        if (this.left) {
            this.moveLeft();
        } else if (this.right) {
            this.moveRight();
        }
    }

    landedOn(platform) {
        let poBottom = Math.floor(this.y + this.h/2);
        // let plTop = Math.floor(platform.y);
        let plTop = [];
        for (let i = platform.y-5; i < platform.y+5; i++) {
            plTop.push(i)
        }

        // let poContact = [];
        // let poRight = this.x + this.w;
        // for (let i = this.x; i < poRight; i++) {
        //     poContact.push(Math.floor(i));
        // }
        // let plContact = [];
        // let platformW = platform.x + platform.w;
        // for (let j = platform.x; j < platformW; j++) {
        //     plContact.push(Math.floor(j));
        // }
        // if (plTop.includes(poBottom) && (this.overlap(poContact, plContact))) {
        //     console.log('bouncing');
        //     return true;
        // } else {
        //     return false;
        // }

        let poMid = Math.floor((this.w / 2) + this.x)

        if (plTop.includes(poBottom) && this.overlap(poMid, platform)) {
            this.jumping = true;
            this.move();
            return true;
        } else {
            return false;
        }
    }

    overlap(poMid, platform) {
        let pEnd = platform.x + platform.w;
        if ((poMid >= platform.x+20) && (poMid <= pEnd+25)) {
            return true;
        }
        return false;
    }

    // overlap(poodleB, platformT) {
    //     for (let i = 0; i < poodleB.length; i++) {
    //         if (platformT.includes(poodleB[i])) return true;
    //     }
    //     return false;
    // }
        

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

    outOfBounds() {
        return this.y > this.boardDimensions.height;
    }
}