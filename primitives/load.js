import { Render } from '../engine/render.js'
import { Primitives } from './primitives.js'

const canvas = document.getElementById("webgl-canvas")
const render = new Render(canvas)

render.scene = new Primitives(render)

window.addEventListener("load", () => render.load())
window.addEventListener("resize", () => render.resize())
