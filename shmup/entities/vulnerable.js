export class Vulnerable {
    constructor(game, entity_index) {
        this.game = game
        this.entity_index = entity_index
    }

    respawn() {
        this.x = this.canvas.width / 2
        this.y = this.canvas.height / 2
        this.hp = 100
        this.invulnerable = 120

        this.waypoint_x = this.x
        this.waypoint_y = this.y
        this.waypoint_r = 1 // cursor size
    }

    damage(from_entity_index, hp) {
        if (this.invulnerable == 0) {
            this.hp -= hp
            console.log(`Took ${hp} damage from entity #${from_entity_index}, ${this.hp} HP left!`)
            if (this.hp <= 0) {
                this.game.sound.playExplosion()
                this.respawn()
            } else {
                this.game.sound.playDamageSound()
            }
        }
    }

    getColorBasedOnHP() {
        if (this.invulnerable > 0) {
            let phase = (this.invulnerable / 5) % 2 < 1 ? 0.7 : 1
            return [phase, phase, phase, 1]
        } else {
            let phase = this.hp / 100
            return [
                this.colorAlive[0] * phase +
                this.colorDead[0] * (1 - phase),

                this.colorAlive[1] * phase +
                this.colorDead[1] * (1 - phase),

                this.colorAlive[2] * phase +
                this.colorDead[2] * (1 - phase),

                1
            ]
        }
    }

    think() {
        if (this.invulnerable > 0) {
            this.invulnerable -= 1
        }
    }
}