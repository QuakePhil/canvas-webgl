export class Projectile {
    constructor(canvas, x, y, speed) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.speed = speed
    }

    draw(webgl) {
        webgl.setColor([0.1, 0.6, 0.9, 1]) // color based on speed? faster - more white
        webgl.line(this.x, this.y, this.x, this.y + this.speed)
    }

    think() {
        this.y += this.speed
        if (this.y < 0 || this.y > this.canvas.height) {
            this.delete = true
        }
    }
}
