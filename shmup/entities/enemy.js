import { Missile } from './missile.js'
import { Vulnerable } from './vulnerable.js'

export class Enemy extends Vulnerable {
    constructor(game, entity_index) {
        super(game, entity_index)
        this.canvas = game.render.canvas
        this.game = game
        this.x = this.canvas.width / 2
        this.y = 0
        this.speed = 2.5

        this.shots = 0
        this.max_shots = 2

        this.offense = true
        this.offense_reload = 0
        this.defense = false

        this.hp = 20
        this.hit_radius = 10
        this.invulnerable = 0

        // this.evasive_maneuvers = ...
    }

    respawn() {
        this.hp = 20
        this.y = 0
        this.x = Math.random() * this.canvas.width
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
                this.shots += 1
                this.game.entities.push(new Missile(this.game, this.x, this.y, 20, this.entity_index))
                if (this.shots % this.max_shots == 0) {
                    this.offense_reload = 180
                } else {
                    this.offense_reload = 30
                }
            }
        }

        this.y += this.speed
        if (this.y > this.canvas.height) {
            this.y = 0
            this.delete = false
        }
    }
}