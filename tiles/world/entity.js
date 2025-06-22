export class Entity {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
        this.waypoints = [[x, y]]
        this.solid_thing_to_avoid = [95, 95, 105, 105]
    }

    draw(world) {
        world.render.ctx.setColor([0.1, 0.6, 0.9, 1])
        world.mouse.zoomAndPan((...args) => {
            world.render.ctx.circle(...args)
        }, this.x, this.y, this.r)
    }

    ensure_waypoints_avoid_solid_think() {
        // code to update this.waypoints to avoid this.solid_thing_to_avoid
    }

    think() {
        const [tx, ty] = this.waypoints[0]
        const dx = tx - this.x
        const dy = ty - this.y
        const dist = Math.hypot(dx, dy) // use fast distance approximator?

        const speed = 5 // max step size per frame
        const epsilon = 0.1 // threshold to consider "arrived"

        if (dist > epsilon) {
            const step = Math.min(speed, dist)
            this.x += (dx / dist) * step
            this.y += (dy / dist) * step
        } else {
            // Snap to target if close enough and optionally advance to next waypoint
            this.x = tx
            this.y = ty
            // this.waypoints.shift() // Uncomment to remove waypoint once reached
        }
    }
}