import { Projectile } from './projectile.js'

export class Enemy {
    constructor(game) {
        this.canvas = game.render.canvas
        this.game = game
        this.x = this.canvas.width / 3
        this.y = 0
        this.speed = 0 // 3

        this.offense = true
        this.offense_reload = 0
        this.defense = false

        // this.evasive_maneuvers = ...
    }

    draw(ctx) {
        ctx.setColor([1, 0, 0, 1])
        ctx.triangle(this.x, this.y + 20, this.x - 10, this.y - 5, this.x + 10, this.y - 5)
    }

    think() {
        if (this.offense_reload > 0) {
            this.offense_reload -= 1
        }
        if (this.offense) {
            if (this.offense_reload == 0) {
                this.game.entities.push(new Projectile(this.game, this.x, this.y, 5))
                this.offense_reload = 30
            }
        }


        this.y += this.speed
        if (this.y > this.canvas.height) {
            this.y = 0
            this.delete = false
        }
    }
}