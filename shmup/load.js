import { Render } from '../engine/render.js'
import { ShootEmUp } from './shootemup.js'

const canvas = document.getElementById("webgl-canvas")
const render = new Render(canvas)

render.resize() // TODO: how to avoid this call?
render.scene = new ShootEmUp(render) // TODO: hook a shootemup.resize() method into render.resize() e.g. to update starfield

window.addEventListener("load", () => render.load())
window.addEventListener("resize", () => render.resize())
