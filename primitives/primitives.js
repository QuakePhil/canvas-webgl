import { Mouse } from '../mouse.js'

export class Primitives {
    constructor(engine) {
        this.mouse = new Mouse()
        this.engine = engine
    }

    draw() {
        this.engine.render.setColor([0.1, 0.6, 0.9, 1])
        //this.engine.render.circle(200, 150, 50)
        this.mouse.zoomAndPan((...args) => {
            this.engine.render.circle(...args)
        }, 200, 150, 50)

        this.engine.render.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.engine.render.line(...args)
        }, 10, 10, 200, 200)

        this.engine.render.setColor([0.6, 0.9, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.engine.render.rect(...args)
        }, 300, 300, 400, 400)

        this.engine.render.setFillColor([0.6, 0.1, 0.9, 1])
        this.mouse.zoomAndPan((...args) => {
            this.engine.render.fillRect(...args)
        }, 300, 500, 400, 600)

        this.engine.render.setColor([0.9, 0.6, 0.1, 1])
        this.mouse.zoomAndPan((...args) => {
            this.engine.render.dashLine(...args)
        }, 10, 110, 200, 300, 10, 10)

        this.engine.report.count_frames_and_report_every_nth()
    }
}
