import { Render } from '../engine/render.js'
import { ShootEmUp } from './shootemup.js'

const canvas = document.getElementById("webgl-canvas")
const render = new Render(canvas)

render.resize() // TODO: how to avoid this call?
render.scene = new ShootEmUp(render)

window.addEventListener("load", () => render.load())
window.addEventListener("resize", () => render.resize())
