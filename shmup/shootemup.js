import { Mouse } from './mouse.js'
import { Player } from './entities/player.js'
import { Starfield } from './entities/starfield.js'
import { Enemy } from './entities/enemy.js'

// todo: initialize middle of canvas
// basic mouse handler to drift the craft towards mouse move
// weapons: (select by wheel)
//   pea shooter (starting)
//   machine gun (fast)
//   shotgun (spread)
//   lock on missiles
// entities:
//   powerups: speed (drifting)
//     firepower
//     armor/health
//   enemies: big/small shoot fast shoot slow
//   bullets
//   seeking missiles
// left mouse button shoot
// right mouse button self clearing explosion
// sounds? (royalty free)
export class ShootEmUp extends Mouse {
    constructor(render) {
        super(render)
        this.render = render
        render.fps = 60

        this.entities = []
        this.entities.push(new Player(this))
        this.entities.push(new Enemy(this))
        let starcount = Math.floor(render.canvas.width * render.canvas.height / 4000)
        console.log(`Starfield count: ${starcount}`)
        for (let i = 0; i < starcount; ++i)
            this.entities.push(new Starfield(this))
    }

    draw() {
        for (let entity of this.entities) {
            entity.draw(this.render.ctx)
        }

        this.render.report.count_frames_and_report_every_nth()

        for (let entity of this.entities) {
            entity.think()
        }

        this.entities = this.entities.filter(item => !item.delete)
    }
}
