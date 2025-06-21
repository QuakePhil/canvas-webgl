import { Render } from '../engine/render.js'
import { World } from './world.js'

const canvas = document.getElementById("webgl-canvas")
const render = new Render(canvas)

render.scene = new World(render)

window.addEventListener("load", () => render.load())
window.addEventListener("resize", () => render.resize())
