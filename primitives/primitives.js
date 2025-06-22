import { Mouse } from '../engine/mouse.js'

export class Primitives {
    constructor(render) {
        this.mouse = new Mouse()
        this.render = render
    }

    draw() {
        this.render.ctx.setColor([0.1, 0.6, 0.9, 1])
        //this.render.ctx.circle(200, 150, 50)
        this.mouse.zoomAndPan((...args) => {
            this.render.ctx.circle(...args)
        }, 200, 150, 50)

        this.render.ctx.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.ctx.line(...args)
        }, 10, 10, 200, 200)

        this.render.ctx.setColor([0.6, 0.9, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.ctx.rect(...args)
        }, 300, 300, 400, 400)

        this.render.ctx.setFillColor([0.6, 0.1, 0.9, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.ctx.fillRect(...args)
        }, 300, 500, 400, 600)

        this.render.ctx.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.ctx.dashLine(...args)
        }, 10, 110, 200, 300, 10, 10)

        this.render.report.count_frames_and_report_every_nth()
    }
}
