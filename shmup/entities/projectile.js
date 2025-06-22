export class Projectile {
    constructor(canvas, x, y, speed) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.speed = speed
        this.color = [1, 1, 1, 1]
    }

    draw(webgl) {
        webgl.setColor(this.color) // color based on speed? faster - more white
        webgl.line(this.x, this.y, this.x, this.y + this.speed)
    }

    think() {
        this.y += this.speed
        if (this.y < 0 || this.y > this.canvas.height) {
            this.delete = true
        }
    }
}
