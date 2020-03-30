const HEX_DIGITS = "0123456789ABCDEF"

export default class Platform {
    constructor(game) {
        this.game = game;
        this.w = 65;
        this.h = 12;
        this.x = Math.random() * (this.game.dimensions.width - this.w);
        this.y = Math.random() * (this.game.dimensions.height - this.h);
        this.randColor();

        switch (game.difficulty) {
            case 'easy':
                this.yVel = 2;
                break;
            case 'insane':
                this.yVel = 8;
                break;
            default:
                this.yVel = 3.5;
        };
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
        this.y = this.y + this.yVel;
        if (this.y >= this.game.dimensions.height) {
            this.y = 0;
            this.x = Math.random() * 635;
            this.randColor();
        }
    }
};