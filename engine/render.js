import { WebGL } from "./webgl.js"
import { TwoD } from "./twod.js"
import { Report } from "./report.js"

export class Render {
    constructor(canvas) {
        this.canvas = canvas
        this.fps = 60
        this.ctx = new WebGL(canvas) // new TwoD(canvas)
        this.report = new Report(5 * this.fps)
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        console.debug(`Width: ${this.canvas.width}, Height: ${this.canvas.height}`)
        this.ctx.resize()
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
        this.ctx.clear?.()
        this.scene.draw()
    }

    load() {
        this.resize()
        this.run()
    }
}
