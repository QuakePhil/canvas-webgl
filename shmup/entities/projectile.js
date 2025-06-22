export class Projectile {
    constructor(game, x, y, speed) {
        this.game = game
        this.x = x
        this.y = y
        this.speed = speed
        this.color = [1, 1, 1, 1]
    }

    draw(ctx) {
        ctx.setColor(this.color) // color based on speed? faster - more white
        ctx.line(this.x, this.y, this.x, this.y + this.speed)
    }

    think() {
        this.y += this.speed
        if (this.y < 0 || this.y > this.game.render.canvas.height) {
            this.delete = true
        }
    }
}
