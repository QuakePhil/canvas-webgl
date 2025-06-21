// for zoom and pan
import { Mouse } from "./mouse.js"

// mixins
import { Line } from './render/line.js'
import { DashLine } from './render/dashline.js'
import { Rect } from './render/rect.js'
import { FillRect } from './render/fillrect.js'
import { Circle } from './render/circle.js'

class Base {
    constructor(canvas) {
        this.mouse = new Mouse()
        this.color = [1, 0, 0, 1]
        this.fillColor = [1, 0, 0, 1]

        this.gl = canvas.getContext("webgl")
        this.resolution = [canvas.width, canvas.height]
        this.program = this._createProgram()
        this.positionBuffer = this.gl.createBuffer()
        this.a_position = this.gl.getAttribLocation(this.program, 'a_position')
        this.u_resolution = this.gl.getUniformLocation(this.program, 'u_resolution')
        this.u_color = this.gl.getUniformLocation(this.program, 'u_color')
    }

    resize(canvas) {
        this.gl.viewport(0, 0, canvas.width, canvas.height)
        this.resolution = [canvas.width, canvas.height]

        this.gl.useProgram(this.program)
        this.gl.uniform2fv(this.u_resolution, this.resolution)
    }

    setColor(color) {
        this.color = color
    }

    setFillColor(fillColor) {
        this.fillColor = fillColor
    }

    zoom(z) {
        return z * this.mouse.delta_z
    }

    zoomAndPan(x, y) {
        return [
            x * this.mouse.delta_z + this.mouse.delta_x,
            y * this.mouse.delta_z + this.mouse.delta_y
        ]
    }

    zoomAndPan4(x1, y1, x2, y2) {
        return [
            x1 * this.mouse.delta_z + this.mouse.delta_x,
            y1 * this.mouse.delta_z + this.mouse.delta_y,
            x2 * this.mouse.delta_z + this.mouse.delta_x,
            y2 * this.mouse.delta_z + this.mouse.delta_y
        ]
    }

    _createProgram() {
        const vsSource = `
        attribute vec2 a_position;
        uniform vec2 u_resolution;
  
        void main() {
          vec2 zeroToOne = a_position / u_resolution;
          vec2 clipSpace = zeroToOne * 2.0 - 1.0;
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }`

        const fsSource = `
        precision mediump float;
        uniform vec4 u_color;
        void main() {
          gl_FragColor = u_color;
        }`

        const vertexShader = this._compileShader(vsSource, this.gl.VERTEX_SHADER)
        const fragmentShader = this._compileShader(fsSource, this.gl.FRAGMENT_SHADER)

        const program = this.gl.createProgram()
        this.gl.attachShader(program, vertexShader)
        this.gl.attachShader(program, fragmentShader)
        this.gl.linkProgram(program)
        return program
    }

    _compileShader(source, type) {
        const shader = this.gl.createShader(type)
        this.gl.shaderSource(shader, source)
        this.gl.compileShader(shader)
        return shader
    }
}

export class Render extends Circle(FillRect(Rect(DashLine(Line(Base))))) { }