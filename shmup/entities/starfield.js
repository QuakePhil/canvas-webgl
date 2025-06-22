import { Projectile } from './projectile.js'

export class Starfield extends Projectile {
    constructor(canvas) {
        super(canvas, 0, 0, 0)
        this.reset()
        this.y = Math.random() * canvas.height
    }

    reset() {
        this.y = 0
        this.x = this.canvas.width * Math.random()
        let configurations = [
            { speed: 1, color: [1, 1, 1, 1] },
            { speed: 2, color: [1, 1, 1, 1] },
            { speed: 4, color: [0.5, 0.5, 0.5, 1] },
            { speed: 8, color: [0.2, 0.2, 0.2, 1] },
            { speed: 16, color: [0.1, 0.1, 0.1, 1] },
        ]
        let configuration = configurations[Math.floor(Math.random() * configurations.length)]
        this.speed = configuration.speed
        this.color = configuration.color
    }

    think() {
        super.think()
        if (this.delete) {
            this.reset()
            this.delete = false
        }
    }
}
