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
        this.render.resize()
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
        this.game.draw()
    }
}
