import { WebGL } from "./webgl.js"
import { Report } from "./report.js"

export class Render {
    constructor(canvas) {
        this.canvas = canvas
        this.fps = 60
        this.webgl = new WebGL(canvas)
        this.report = new Report(5 * this.fps)
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        console.debug(`Width: ${this.canvas.width}, Height: ${this.canvas.height}`)
        this.webgl.resize()
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
        this.scene.draw()
    }

    load() {
        this.resize()
        this.run()
    }
}
