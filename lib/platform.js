export default class Platform {
    constructor(options) {
        this.pos = options.pos
        // this.color = options.color
    }

    draw(ctx) {
        ctx.fillStyle = "#FDD50C";
        ctx.fillRect(25, 25, 65, 10);
    }


};