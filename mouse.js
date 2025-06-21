export class Mouse {
    constructor() {
        this.delta_x = 0 // transpose left/right
        this.delta_y = 0 // transpose up/down
        this.delta_z = 1 // zoom
        this.dragging = false
        this.last_x = 0
        this.last_y = 0

        document.addEventListener("wheel", (event) => {
            if (this.handler) {
                return this.handler.wheel(event)
            }
            let dx = event.clientX
            let dy = event.clientY
            let dz = 0
            if (event.deltaY < 0) {
                if (this.delta_z < 64) {
                    dz = 2
                }
            } else {
                if (this.delta_z > 1) {
                    dz = 0.5
                }
            }
            if (dz != 0) {
                let scale = (this.delta_z * dz) / this.delta_z
                // update transpositions to account for center of zoom
                this.delta_x = dx - (dx - this.delta_x) * scale
                this.delta_y = dy - (dy - this.delta_y) * scale
                // update zoom
                this.delta_z *= dz
            }
            console.debug(`Zoom: ${this.delta_z}, Center: ΔX=${this.delta_x}, ΔY=${this.delta_y}`)
        })

        document.addEventListener("mousedown", (event) => {
            if (this.handler) {
                return this.handler.mousedown(event)
            }
            // Prevent context menu on right-click
            event.preventDefault()

            // Only handle left-click (button 0)
            if (event.button === 0) {
                this.dragging = true
                this.last_x = event.clientX
                this.last_y = event.clientY
                console.debug("Left button down: drag started")
            } else if (event.button === 2) {
                //let waypoint_x = event.clientX - window.mouse.delta_x
                //let waypoint_y = event.clientY - window.mouse.delta_y
                //waypoint_x *= 1 / window.mouse.delta_z
                //waypoint_y *= 1 / window.mouse.delta_z

                //window.world.entities[0].waypoints = [[waypoint_x, waypoint_y]]
                //window.world.entities[0].ensure_waypoints_avoid_solid_think()
                //console.log(window.world.entities[0].waypoints)
                console.debug("Right button clicked")
            }
        })

        // Also ensure context menu is globally disabled if needed
        document.addEventListener("contextmenu", (event) => {
            if (this.handler) {
                return this.handler.contextmenu(event)
            }
            //event.preventDefault()
        })

        document.addEventListener("mousemove", (event) => {
            if (this.handler) {
                return this.handler.mousemove(event)
            }
            if (this.dragging) {
                let dx = event.clientX - this.last_x
                let dy = event.clientY - this.last_y
                this.delta_x += dx
                this.delta_y += dy
                console.debug(`Drag: ΔX=${this.delta_x}, ΔY=${this.delta_y}`)
                this.last_x = event.clientX
                this.last_y = event.clientY
            }
        })

        document.addEventListener("mouseup", () => {
            if (this.handler) {
                return this.handler.mouseup(event)
            }
            this.dragging = false
        })
    }

    zoomAndPan(cb, ...args) {
        if (args.length === 2) {
            cb(
                args[0] * this.delta_z + this.delta_x,
                args[1] * this.delta_z + this.delta_y
            )
        } else if (args.length === 3) {
            cb(
                args[0] * this.delta_z + this.delta_x,
                args[1] * this.delta_z + this.delta_y,
                args[2] * this.delta_z
            )
        } else if (args.length === 4) {
            cb(
                args[0] * this.delta_z + this.delta_x,
                args[1] * this.delta_z + this.delta_y,
                args[2] * this.delta_z + this.delta_x,
                args[3] * this.delta_z + this.delta_y
            )
        } else if (args.length === 6) {
            cb(
                args[0] * this.delta_z + this.delta_x,
                args[1] * this.delta_z + this.delta_y,
                args[2] * this.delta_z + this.delta_x,
                args[3] * this.delta_z + this.delta_y,
                args[4] * this.delta_z,
                args[5] * this.delta_z
            )
        }
    }
}