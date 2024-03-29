const HEX_DIGITS = "0123456789ABCDEF";
// const COLORS = ['#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];
// const COLORS = ['#08f7fe', '#09fbd3', '#fe53bb', '#f5d300'];

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
        // this.color = COLORS[Math.floor(Math.random()*6)]
        this.color = "#"
        for (let i = 0; i < 6; i++) {
            this.color += HEX_DIGITS[Math.floor((Math.random() * 16))];
        };
    }
    
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.w, this.h, 5);
        ctx.stroke();
        ctx.fill();
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