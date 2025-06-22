export class Mouse {
    constructor(render) {
        document.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.entities[0].offense = true
                console.debug("Left button!")
            } else if (event.button === 2) {
                console.debug("Right button!")
                this.entities[0].defense = true
            }
        })

        document.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                console.debug("Left button down!")
                this.entities[0].offense = false
            } else if (event.button === 2) {
                console.debug("Right button down!")
                this.entities[0].defense = false
            }
        })

        document.addEventListener("mousemove", (event) => {
            this.entities[0].waypoint_x = event.clientX
            this.entities[0].waypoint_y = event.clientY
        })
    }
}