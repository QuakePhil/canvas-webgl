import { Render } from "./engine/render.js"
import { Report } from "./engine/report.js"

export class Engine {
    constructor(canvas) {
        this.canvas = canvas
        this.fps = 60
        this.render = new Render(canvas)
        this.report = new Report(5 * this.fps)
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        console.debug(`Width: ${this.canvas.width}, Height: ${this.canvas.height}`)
        this.render.resize(this.canvas)
    }

    load() {
        this.resize()
        this.run()
    }

    run() {
        if (this.interval == undefined) {
            this.interval = setInterval(() => {
                window.requestAnimationFrame(() => this.frame())
            }, 1000.0 / this.fps)
            console.debug("Engine running")
        } else {
            console.warn("Already running")
        }
    }

    frame() {
        this.render.setColor([0.1, 0.6, 0.9, 1])
        this.render.circle(200, 150, 50)

        this.render.setColor([0.9, 0.6, 0.1, 1])
        this.render.line(10, 10, 200, 200)

        this.render.setColor([0.6, 0.9, 0.1, 1])
        this.render.rect(300, 300, 400, 400)

        this.render.setFillColor([0.6, 0.1, 0.9, 1])
        this.render.fillRect(300, 500, 400, 600)

        this.render.setColor([0.9, 0.6, 0.1, 1])
        this.render.dashLine(10, 110, 200, 300, 10, 10)

        this.report.count_frames_and_report_every_nth()
    }
}
