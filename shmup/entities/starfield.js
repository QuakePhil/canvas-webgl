import { Projectile } from './projectile.js'

export class Starfield extends Projectile {
    constructor(canvas) {
        super(canvas, 0, 0, 0)
        this.canvas = canvas
        this.x = Math.random() * canvas.width
        this.y = 0
        this.speed = 5 * Math.random() + 10
    }

    reset() {
        this.y = 0
        this.x = this.canvas.width * Math.random()
    }

    think() {
        super.think()
        if (this.y > this.canvas.height) {
            this.delete = false
            this.reset()
        }
    }
}
