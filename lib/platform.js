export default class Platform {
    constructor(options) {
        this.pos = options.pos
        // this.color = options.color
    }

    draw(ctx) {
        ctx.fillStyle = "#FDD50C";
        ctx.fillRect(this.pos[0], this.pos[1], 65, 10);
    }

    move() {
        
    }
};