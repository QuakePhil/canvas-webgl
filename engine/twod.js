export class TwoD {
    constructor(canvas) {
        this.canvas = canvas
        this.twod = canvas.getContext("2d")
    }

    clear() {
        this.twod.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    resize() {
        this.color = [1, 0, 0, 1]
        this.fillColor = [1, 0, 0, 1]
    }

    setColor(color) {
        this.color = color
    }

    setFillColor(fillColor) {
        this.fillColor = fillColor
    }

    circle(x, y, radius) {
        this.twod.beginPath()
        this.twod.arc(x, y, radius, 0, 2 * Math.PI)
        this.twod.stroke()
    }

    line(x1, y1, x2, y2) {
        this.twod.moveTo(x1, y1)
        this.twod.lineTo(x2, y2)
        this.twod.stroke() 
    }

    triangle(x1, y1, x2, y2, x3, y3) {
        this.twod.moveTo(x1, y1)
        this.twod.lineTo(x2, y2)
        this.twod.lineTo(x3, y3)
        this.twod.lineTo(x1, y1)
        this.twod.stroke()
    }

    dashLine(x1, y1, x2, y2, d1, d2) {
        this.twod.setLineDash([d1, d2])
        this.twod.moveTo(x1, y1)
        this.twod.lineTo(x2, y2)
        this.twod.stroke() 
        this.twod.setLineDash([])
    }

    rect(x1, y1, x2, y2) {
        this.twod.strokeRect(x1, y1, x2 - x1, y2 - y1)
    }

    fillRect(x1, y1, x2, y2) {
        this.twod.moveTo(x1, y1)
        this.twod.strokeRect(x1, y1, x2 - x1, y2 - y1)
    }
}