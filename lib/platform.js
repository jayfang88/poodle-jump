const HEX_DIGITS = "0123456789ABCDEF"

export default class Platform {
    constructor(options) {
        this.game = options.game;
        this.w = 65;
        this.h = 12;
        // this.x = this.game.dimensions.width/2 - this.w/2;
        // this.y = 550;
        this.x = Math.random() * (this.game.dimensions.width - this.w);
        this.y = Math.random() * (this.game.dimensions.height - this.h);
        this.randColor();
    }
    
    randColor() {
        this.color = "#"
        for (let i = 0; i < 6; i++) {
            this.color += HEX_DIGITS[Math.floor((Math.random() * 16))];
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    move() {
        this.y = this.y + 2;
        if (this.y >= this.game.dimensions.height) {
            this.y = 0;
            this.x = Math.random() * 635;
            this.randColor();
        }
    }
};