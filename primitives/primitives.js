import { Mouse } from '../engine/mouse.js'

export class Primitives {
    constructor(render) {
        this.mouse = new Mouse()
        this.render = render
    }

    draw() {
        this.render.webgl.setColor([0.1, 0.6, 0.9, 1])
        //this.render.webgl.circle(200, 150, 50)
        this.mouse.zoomAndPan((...args) => {
            this.render.webgl.circle(...args)
        }, 200, 150, 50)

        this.render.webgl.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.webgl.line(...args)
        }, 10, 10, 200, 200)

        this.render.webgl.setColor([0.6, 0.9, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.webgl.rect(...args)
        }, 300, 300, 400, 400)

        this.render.webgl.setFillColor([0.6, 0.1, 0.9, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.webgl.fillRect(...args)
        }, 300, 500, 400, 600)

        this.render.webgl.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.render.webgl.dashLine(...args)
        }, 10, 110, 200, 300, 10, 10)

        this.render.report.count_frames_and_report_every_nth()
    }
}
