import { Missile } from './missile.js'
import { Vulnerable } from './vulnerable.js'

export class Player extends Vulnerable {
    constructor(game, entity_index) {
        super(game, entity_index)
        this.canvas = game.render.canvas
        this.game = game

        this.offense = false
        this.offense_reload = 0
        this.defense = false

        this.hit_radius = 10

        this.colorDead = [1, 0, 0]
        this.colorAlive = [0.1, 0.6, 0.9]


        this.respawn()
    }

    draw(ctx) {
        ctx.setColor([0.1, 0.6, 0.9, 1])
        ctx.circle(this.waypoint_x, this.waypoint_y, this.waypoint_r)

        ctx.setColor(this.getColorBasedOnHP())
        ctx.triangle(this.x, this.y - 20, this.x - 10, this.y + 5, this.x + 10, this.y + 5)
    }

    think() {
        super.think()
        if (this.offense_reload > 0) {
            this.offense_reload -= 1
        }
        if (this.offense) {
            if (this.offense_reload == 0) {
                this.game.sound.playBlaster(660)
                this.game.entities.push(new Missile(this.game, this.x, this.y, -20, this.entity_index))
                this.offense_reload = 30
            }
        }

        this.waypoint_r += 0.2
        if (this.waypoint_r > 5) {
            this.waypoint_r = 1
        }

        const dx = this.waypoint_x - this.x
        const dy = this.waypoint_y - this.y
        const dist = Math.hypot(dx, dy) // use fast distance approximator?

        const speed = 3 // max step size per frame
        const epsilon = 0.1 // threshold to consider "arrived"

        if (dist > epsilon) {
            const step = Math.min(speed, dist)
            this.x += (dx / dist) * step
            this.y += (dy / dist) * step
        } else {
            // Snap to target if close enough and optionally advance to next waypoint
            this.x = this.waypoint_x
            this.y = this.waypoint_y
            // this.waypoints.shift() // Uncomment to remove waypoint once reached
        }
    }
}
