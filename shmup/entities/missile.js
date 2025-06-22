import { Projectile } from './projectile.js'
import { Vulnerable } from './vulnerable.js'

export class Missile extends Projectile {
    constructor(game, x, y, speed, original_entity_index) {
        super(game, x, y, speed)
        this.original_entity_index = original_entity_index
    }

    _isLineInCircle(x1, y1, x2, y2, cx, cy, r) {
        // Check if either endpoint is inside the circle
        const inside1 = (x1 - cx) ** 2 + (y1 - cy) ** 2 <= r ** 2;
        const inside2 = (x2 - cx) ** 2 + (y2 - cy) ** 2 <= r ** 2;
        if (inside1 || inside2) return true;

        // Compute line segment projection
        const dx = x2 - x1;
        const dy = y2 - y1;
        const l2 = dx * dx + dy * dy;
        if (l2 === 0) return false; // zero-length line

        // Project circle center onto the line
        let t = ((cx - x1) * dx + (cy - y1) * dy) / l2;
        t = Math.max(0, Math.min(1, t)); // Clamp to segment

        const closestX = x1 + t * dx;
        const closestY = y1 + t * dy;

        // Check distance from closest point to circle center
        const distSq = (closestX - cx) ** 2 + (closestY - cy) ** 2;
        return distSq <= r ** 2;
    }

    think() {
        for (let i = 0; i < this.game.entities.length; ++i) {
            if (
                this.game.entities[i] instanceof Vulnerable
                && i != this.original_entity_index
            ) {
                let hit = this._isLineInCircle(
                    this.x, this.y, this.x, this.y + this.speed,
                    this.game.entities[i].x, // TODO: test against all Vulnerable entities!
                    this.game.entities[i].y,
                    this.game.entities[i].hit_radius
                )
                if (hit) {
                    this.game.entities[i].damage(this.original_entity_index, Math.abs(this.speed))
                    this.delete = true
                }
            }
        }
        super.think()
    }
}