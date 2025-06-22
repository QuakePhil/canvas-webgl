export class Mouse {
    constructor(render) {
        document.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.entities[0].offense = true
            } else if (event.button === 2) {
                this.entities[0].defense = true
            }
        })

        document.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.entities[0].offense = false
            } else if (event.button === 2) {
                this.entities[0].defense = false
            }
        })

        document.addEventListener("mousemove", (event) => {
            this.entities[0].waypoint_x = event.clientX
            this.entities[0].waypoint_y = event.clientY
        })


        document.addEventListener("mouseleave", (event) => {
            this.entities[0].waypoint_x = this.entities[0].x
            this.entities[0].waypoint_y = this.entities[0].y
        })
    }
}